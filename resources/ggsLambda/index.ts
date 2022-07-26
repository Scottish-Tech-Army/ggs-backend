require("es6-promise").polyfill();
require("isomorphic-fetch");
import {
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

type GGSUnit = {
  unitId: string; // Email
  name: string;
  locations: string[];
};

type GGSLocation = {
  locationId: string;
  city?: string;
  county: string;
  collected?: boolean;
};

// From https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const VALID_EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const locationsTableName = process.env.LOCATIONS_TABLE_NAME;
const unitsTableName = process.env.UNITS_TABLE_NAME;

const headers = { "Access-Control-Allow-Origin": "*" };

const getLocations = (): Promise<GGSLocation[]> =>
  dynamodbClient
    .send(
      new ScanCommand({
        TableName: locationsTableName,
        ReturnConsumedCapacity: "TOTAL",
      })
    )
    .then((result) =>
      result.Items!.map((item) => unmarshall(item) as GGSLocation)
    );

const getUnitIds = () =>
  dynamodbClient
    .send(
      new ScanCommand({
        TableName: unitsTableName,
        ReturnConsumedCapacity: "TOTAL",
        ProjectionExpression: "unitId",
      })
    )
    .then((result) => result.Items!.map((item) => unmarshall(item).unitId));

const getUnit = (unitId: string): Promise<GGSUnit | undefined> =>
  dynamodbClient
    .send(
      new GetItemCommand({
        TableName: unitsTableName,
        Key: marshall({ unitId }),
      })
    )
    .then((result) =>
      result.Item ? (unmarshall(result.Item) as GGSUnit) : undefined
    );

const getLocation = (locationId: string): Promise<GGSLocation | undefined> =>
  dynamodbClient
    .send(
      new GetItemCommand({
        TableName: locationsTableName,
        Key: marshall({ locationId }),
      })
    )
    .then((result) =>
      result.Item ? (unmarshall(result.Item) as GGSLocation) : undefined
    );

const updateUnit = (unit: Record<string, any>) =>
  dynamodbClient.send(
    new PutItemCommand({
      TableName: unitsTableName,
      Item: marshall(unit),
    })
  );

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing request", event);

  const errorResponse = (
    statusCode: number,
    message: string
  ): APIGatewayProxyResult => ({
    headers,
    statusCode,
    body: JSON.stringify({ message, request: event }),
  });

  if (event.resource === "/unit/login") {
    if (!event.body) {
      return errorResponse(400, "Invalid request body");
    }
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, "Invalid request body");
    }
    if (!payload.email) {
      return errorResponse(400, "Unit login email missing");
    }

    const inputEmail = payload.email.trim().toLowerCase();

    const unit = await getUnit(inputEmail);

    if (!unit) {
      return errorResponse(404, "Unit login email not found: " + payload.email);
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ email: unit.unitId, name: unit.name }),
    };
  }

  if (event.resource === "/unit/register") {
    if (!event.body) {
      return errorResponse(400, "Invalid request body");
    }
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, "Invalid request body");
    }
    if (!payload.email) {
      return errorResponse(400, "Unit register email missing");
    }

    const inputEmail = payload.email.trim().toLowerCase();
    const inputName = payload.name.trim();

    if (!VALID_EMAIL_REGEX.test(inputEmail)) {
      return errorResponse(
        400,
        "Unit register email invalid: " + payload.email
      );
    }

    const unit = await getUnit(inputEmail);

    if (unit) {
      return errorResponse(
        409,
        "Unit register email already exists: " + payload.email
      );
    }

    const newUnit = { unitId: inputEmail, name: inputName };
    await updateUnit(newUnit);

    return {
      headers,
      statusCode: 201,
      body: JSON.stringify({ email: inputEmail, name: inputName }),
    };
  }

  const unitName = event.headers.ggsunit;
  if (!unitName) {
    return errorResponse(400, "Request missing header: ggsunit");
  }
  const unit = await getUnit(unitName);
  if (!unit) {
    return errorResponse(404, "Unit not found: " + unitName);
  }

  if (event.resource === "/locations") {
    const locations = await getLocations();

    if (unit.locations) {
      unit.locations.forEach((locationId) => {
        const location = locations.find(
          (current) => current.locationId === locationId
        );
        if (location) {
          location.collected = true;
        } else {
          console.warn("Unknown location: " + locationId);
        }
      });
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(locations),
    };
  }

  if (event.resource === "/unit/collect") {
    if (!event.body) {
      return errorResponse(400, "Invalid request body");
    }
    let payload;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, "Invalid request body");
    }
    const locationId = payload.id;
    if (!locationId) {
      return errorResponse(400, "locationId missing");
    }

    const location = await getLocation(locationId);

    if (!location) {
      return errorResponse(404, "location not found: " + locationId);
    }

    if (unit.locations && unit.locations.includes(locationId)) {
      console.warn(
        `Unit ${unitName} has already collected location ${locationId}`
      );
    } else {
      console.log(`Updating unit ${unitName}`);

      if (!unit.locations) {
        unit.locations = [];
      }
      unit.locations.push(locationId);
      await updateUnit(unit);
      console.log(`Unit ${unitName} has collected location ${locationId}`);
    }

    return { headers, statusCode: 200, body: "" };
  }

  if (event.resource === "/unit/leaderboard") {
    const locations = await getLocations();

    const locationAreas: Record<string, string> = {};
    const areaTotals: Record<string, number> = {};
    locations.forEach((location) => {
      const area = location.city
        ? `${location.city}, ${location.county}`
        : location.county;
      const count = areaTotals[area] || 0;
      areaTotals[area] = count + 1;

      locationAreas[location.locationId] = area;
    });

    const areas = Object.keys(areaTotals);
    const collectedTotals: Record<string, number> = {};
    if (unit.locations) {
      unit.locations.forEach((locationId) => {
        const area = locationAreas[locationId];
        if (area) {
          const count = collectedTotals[area] || 0;
          collectedTotals[area] = count + 1;
        }
      });
    }

    const collectedPercentages = areas
      .map((area) => ({
        area,
        percentageCollected: Math.round(
          (100 * (collectedTotals[area] || 0)) / areaTotals[area]
        ),
      }))
      .filter(({ percentageCollected }) => percentageCollected > 0);

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(collectedPercentages),
    };
  }

  return {
    headers,
    statusCode: 400,
    body: JSON.stringify({ message: "Unrecognised request", request: event }),
  };
};
