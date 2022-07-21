import { handler } from "./index";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyEvent } from "aws-lambda";
import { TEST_LOCATIONS_TABLE_NAME, TEST_UNITS_TABLE_NAME } from "./setupTests";

jest.mock("./aws");

const DB_UNITS_RESPONSE = {
  Items: [
    { unitId: { S: "Test Team" }, locations: { L: [] } },
    { unitId: { S: "\t \tTest Team 2" }, locations: { L: [] } },
  ],
};

const DB_GET_UNIT_RESPONSE = {
  Item: { unitId: { S: "Test Team" }, locations: { L: [] } },
};

const LOCATIONS = [
  {
    locationId: "Old College",
    city: "Edinburgh",
    county: "Midlothian",
    description: "Description 1",
    latitude: 55.9472097,
    longitude: -3.1892527,
    name: "Old College",
    photos: [{ isMain: true, url: "https://URL1" }],
  },
  {
    locationId: "Arthur's Seat",
    city: "Edinburgh",
    county: "Midlothian",
    description: "Description 2",
    latitude: 55.9474659,
    longitude: -3.1777573,
    name: "Arthur's Seat",
    photos: [{ isMain: true, url: "https://URL2" }],
  },
  {
    locationId: "Brig o'Balgownie",
    county: "Aberdeen",
    description: "Description 3",
    latitude: 57.1772,
    longitude: -2.0985,
    name: "Brig o'Balgownie",
    photos: [],
  },
];

const DYNAMO_LOCATIONS = [
  {
    locationId: { S: "Old College" },
    city: { S: "Edinburgh" },
    county: { S: "Midlothian" },
    description: { S: "Description 1" },
    latitude: { N: "55.9472097" },
    longitude: { N: "-3.1892527" },
    name: { S: "Old College" },
    photos: {
      L: [{ M: { isMain: { BOOL: true }, url: { S: "https://URL1" } } }],
    },
  },

  {
    locationId: { S: "Arthur's Seat" },
    city: { S: "Edinburgh" },
    county: { S: "Midlothian" },
    description: { S: "Description 2" },
    latitude: { N: "55.9474659" },
    longitude: { N: "-3.1777573" },
    name: { S: "Arthur's Seat" },
    photos: {
      L: [{ M: { isMain: { BOOL: true }, url: { S: "https://URL2" } } }],
    },
  },

  {
    locationId: { S: "Brig o'Balgownie" },
    county: { S: "Aberdeen" },
    description: { S: "Description 3" },
    latitude: { N: "57.1772" },
    longitude: { N: "-2.0985" },
    name: { S: "Brig o'Balgownie" },
    photos: { L: [] },
  },
];

const DB_LOCATIONS_RESPONSE = { Items: DYNAMO_LOCATIONS };

describe("api call POST /unit/login", () => {
  it("successful response (case insensitive)", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ code: "TEST team" }),
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ unitName: "Test Team" }));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          ProjectionExpression: "unitId",
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response (whitespace insensitive)", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ code: "TEST team 2   \t\t" }),
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({ unitName: "\t \tTest Team 2" })
    );
  });

  it("failure response on unknown code", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ code: "unknown TEAM" }),
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit login code not found: unknown TEAM",
        request: {
          body: '{"code":"unknown TEAM"}',
          resource: "/unit/login",
        },
      })
    );
  });

  it("failure response on empty DB table", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue({ Items: [] });

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ code: "unknown TEAM" }),
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit login code not found: unknown TEAM",
        request: {
          body: '{"code":"unknown TEAM"}',
          resource: "/unit/login",
        },
      })
    );
  });

  it("failure response on missing input code", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ key: "something else" }),
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit login code missing",
        request: {
          body: '{"key":"something else"}',
          resource: "/unit/login",
        },
      })
    );
  });

  it("failure response on null body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: null,
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: { body: null, resource: "/unit/login" },
      })
    );
  });

  it("failure response on empty body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: "",
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: { body: "", resource: "/unit/login" },
      })
    );
  });

  it("failure response on invalid body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValue(DB_UNITS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      body: "broken json",
      resource: "/unit/login",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: { body: "broken json", resource: "/unit/login" },
      })
    );
  });
});

describe("api call GET /locations", () => {
  it("successful response", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(LOCATIONS));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with unit missing locations array", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: { unitId: { S: "Test Team" } },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(LOCATIONS));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with collected locations", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [{ S: "Old College" }, { S: "Brig o'Balgownie" }],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify([
        { ...LOCATIONS[0], collected: true },
        LOCATIONS[1],
        { ...LOCATIONS[2], collected: true },
      ])
    );
  });

  it("successful response with unknown collected location", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [
            { S: "Unknown location" },
            { S: "Old College" },
            { S: "Brig o'Balgownie" },
          ],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify([
        { ...LOCATIONS[0], collected: true },
        LOCATIONS[1],
        { ...LOCATIONS[2], collected: true },
      ])
    );
  });

  it("successful response with empty locations table", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Items: [],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify([]));
  });

  it("failure response on unknown unitName", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "Unknown Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit not found: Unknown Team",
        request: {
          resource: "/locations",
          headers: { ggsunit: "Unknown Team" },
        },
      })
    );
  });

  it("failure response on empty unitName", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: { ggsunit: "" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Request missing header: ggsunit",
        request: {
          resource: "/locations",
          headers: { ggsunit: "" },
        },
      })
    );
  });

  it("failure response on missing ggsunit header", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/locations",
      headers: {},
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Request missing header: ggsunit",
        request: {
          resource: "/locations",
          headers: {},
        },
      })
    );
  });
});

describe("api call POST /unit/collect", () => {
  it("successful response", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: DYNAMO_LOCATIONS[1],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Test Team" },
      body: JSON.stringify({ id: "Arthur's Seat" }),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(3);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          Key: { locationId: { S: "Arthur's Seat" } },
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        input: {
          Item: {
            unitId: { S: "Test Team" },
            locations: {
              L: [{ S: "Arthur's Seat" }],
            },
          },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with previous collected locations", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [{ S: "Old College" }, { S: "Brig o'Balgownie" }],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: DYNAMO_LOCATIONS[1],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Test Team" },
      body: JSON.stringify({ id: "Arthur's Seat" }),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(3);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          Key: { locationId: { S: "Arthur's Seat" } },
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        input: {
          Item: {
            unitId: { S: "Test Team" },
            locations: {
              L: [
                { S: "Old College" },
                { S: "Brig o'Balgownie" },
                { S: "Arthur's Seat" },
              ],
            },
          },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with already collected location", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [{ S: "Old College" }, { S: "Brig o'Balgownie" }],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: DYNAMO_LOCATIONS[0],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Test Team" },
      body: JSON.stringify({ id: "Old College" }),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          Key: { locationId: { S: "Old College" } },
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response - stored unit without locations array", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: { unitId: { S: "Test Team" } },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: DYNAMO_LOCATIONS[1],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Test Team" },
      body: JSON.stringify({ id: "Arthur's Seat" }),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(3);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          Key: { locationId: { S: "Arthur's Seat" } },
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        input: {
          Item: {
            unitId: { S: "Test Team" },
            locations: {
              L: [{ S: "Arthur's Seat" }],
            },
          },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );
  });

  it("failure response with unknown collected location", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [{ S: "Unknown location" }, { S: "Brig o'Balgownie" }],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Test Team" },
      body: JSON.stringify({ id: "Unknown Location" }),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "location not found: Unknown Location",
        request: event,
      })
    );

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          Key: { locationId: { S: "Unknown Location" } },
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("failure response on unknown unitName", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: { ggsunit: "Unknown Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit not found: Unknown Team",
        request: {
          resource: "/unit/collect",
          headers: { ggsunit: "Unknown Team" },
        },
      })
    );
  });

  it("failure response on missing ggsunit header", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/collect",
      headers: {},
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Request missing header: ggsunit",
        request: {
          resource: "/unit/collect",
          headers: {},
        },
      })
    );
  });

  it("failure response on missing input location id", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({ key: "something else" }),
      headers: { ggsunit: "Test Team" },
      resource: "/unit/collect",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "locationId missing",
        request: {
          body: '{"key":"something else"}',
          headers: { ggsunit: "Test Team" },
          resource: "/unit/collect",
        },
      })
    );
  });

  it("failure response on null body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      body: null,
      headers: { ggsunit: "Test Team" },
      resource: "/unit/collect",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: null,
          headers: { ggsunit: "Test Team" },
          resource: "/unit/collect",
        },
      })
    );
  });

  it("failure response on empty body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      body: "",
      headers: { ggsunit: "Test Team" },
      resource: "/unit/collect",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: "",
          headers: { ggsunit: "Test Team" },
          resource: "/unit/collect",
        },
      })
    );
  });

  it("failure response on invalid body", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      body: "broken json",
      headers: { ggsunit: "Test Team" },
      resource: "/unit/collect",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: "broken json",
          headers: { ggsunit: "Test Team" },
          resource: "/unit/collect",
        },
      })
    );
  });
});

describe("api call GET /unit/leaderboard", () => {
  it("successful response with no locations collected", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify([]));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with unit missing locations array", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: { unitId: { S: "Test Team" } },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify([]));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        input: {
          Key: { unitId: { S: "Test Team" } },
          TableName: TEST_UNITS_TABLE_NAME,
        },
      })
    );

    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with collected locations", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [{ S: "Old College" }, { S: "Brig o'Balgownie" }],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify([
        { area: "Edinburgh, Midlothian", percentageCollected: 50 },
        { area: "Aberdeen", percentageCollected: 100 },
      ])
    );
  });

  it("successful response with unknown collected location", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Item: {
        unitId: { S: "Test Team" },
        locations: {
          L: [
            { S: "Unknown Location" },
            { S: "Old College" },
            { S: "Brig o'Balgownie" },
          ],
        },
      },
    });
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_LOCATIONS_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify([
        { area: "Edinburgh, Midlothian", percentageCollected: 50 },
        { area: "Aberdeen", percentageCollected: 100 },
      ])
    );
  });

  it("successful response with empty locations table", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Items: [],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify([]));
  });

  it("failure response on unknown unitName", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "Unknown Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unit not found: Unknown Team",
        request: {
          resource: "/unit/leaderboard",
          headers: { ggsunit: "Unknown Team" },
        },
      })
    );
  });

  it("failure response on empty unitName", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: { ggsunit: "" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Request missing header: ggsunit",
        request: {
          resource: "/unit/leaderboard",
          headers: { ggsunit: "" },
        },
      })
    );
  });

  it("failure response on missing ggsunit header", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unit/leaderboard",
      headers: {},
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Request missing header: ggsunit",
        request: {
          resource: "/unit/leaderboard",
          headers: {},
        },
      })
    );
  });
});

describe("api catchall error response", () => {
  it("error response", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(
      DB_GET_UNIT_RESPONSE
    );

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unknown",
      headers: { ggsunit: "Test Team" },
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unrecognised request",
        request: {
          resource: "/unknown",
          headers: { ggsunit: "Test Team" },
        },
      })
    );
  });
});
