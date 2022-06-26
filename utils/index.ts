import { PutItemCommand, PutItemOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
var XLSX = require("xlsx");
require("dotenv").config({ path: ".env.local" });
import { dynamodbClient } from "./aws";

type GGSLocation = {
  locationId: string;
  region: string;
  county: string;
  city?: string;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  challenge: string;
  photos: any[];
};

const COLUMN_COUNTY = "District/ county";
const COLUMN_CITY = "City/town";
const COLUMN_NAME = "Name of location";
const COLUMN_LATITUDE = "Latitude";
const COLUMN_LONGITUDE = "Longitude";
const COLUMN_DESCRIPTION = "Description of map point";
const COLUMN_CHALLENGE = "Challenge";

const ROWS_TO_SKIP = 3;

var workbook = XLSX.readFile(process.env.SOURCE_SPREADSHEET_PATH);

const sheetNames = [...workbook.SheetNames];
// Skip the overview sheet
sheetNames.shift();

// Each sheet has a different name for the column...
function getPhotoColumnKey(sheetJson: any): string {
  let photoColumnKey: string | undefined = undefined;
  sheetJson.forEach((row: Record<string, any>) => {
    photoColumnKey =
      photoColumnKey ||
      Object.keys(row).find(
        (key) => key.includes("folder") || key.toLowerCase().includes("image")
      );
  });
  return photoColumnKey!;
}

function sanitise(input?: string): string {
  return input ? input.toLowerCase().replace(/[^a-z0-9]/gi, "") : "";
}

function createLocationId(
  county: string,
  city: string | undefined,
  name: string
) {
  return `${sanitise(county)}-${sanitise(city)}-${sanitise(name)}`;
}

type Coordinate = {
  latitude: number;
  longitude: number;
};

const REGEX_DEG_MIN_SEC = /^\s*([+-]?\d+)\D+(\d+)\D+(\d+(\.\d+)?)\D*$/;

function getOrdinate(input: string | number | undefined): number {
  if (typeof input === "number") {
    return Number.isInteger(input) ? 0 : input;
  }

  const result = input ? parseFloat(input.trim()) : 0;
  if (!result || Number.isNaN(result)) {
    // Input is unlikely to be valid ordinate
    return 0;
  }

  if (!Number.isInteger(result)) {
    return result;
  }

  // Integer suggests degree minute second format - attempt to parse
  const components = input!.match(REGEX_DEG_MIN_SEC);
  if (!components) {
    return 0;
  }

  return (
    parseFloat(components[1]) +
    parseFloat(components[2]) / 60 +
    parseFloat(components[3]) / 3600
  );
}

export function parseCoordinates(
  inputLatitude: string | number | undefined,
  inputLongitude: string | number | undefined
): Coordinate | undefined {
  const latitude = getOrdinate(inputLatitude);
  let longitude = getOrdinate(inputLongitude);

  if (!latitude || !longitude) {
    // One of the ordinates is probably bad
    console.warn("Probably bad lat/long: ", inputLatitude, inputLongitude);
    return undefined;
  }

  // Handle incorrect signs for longitudes - everything is west of prime meridian
  longitude = -Math.abs(longitude);

  if (latitude < 50 || latitude > 61 || longitude < -9 || longitude > 0) {
    // Out of range coordinates
    console.warn(
      "Probably transposed lat/long: ",
      inputLatitude,
      inputLongitude
    );
    return undefined;
  }

  return { latitude, longitude };
}

export function buildLocations(workbook: any): GGSLocation[] {
  let successCount = 0;
  let failCount = 0;
  const result: GGSLocation[] = [];

  sheetNames.forEach((sheetName) => {
    const contents = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      range: ROWS_TO_SKIP,
    });
    // TODO photo handling
    // let photoColumnKey = getPhotoColumnKey(contents);

    // Some column values carry forward (ie not populated in succeeding rows)
    let county: string = "";
    let city: string | undefined = undefined;

    contents.forEach((row: Record<string, any>) => {
      const newCounty = row[COLUMN_COUNTY];
      if (newCounty) {
        county = newCounty;
        city = undefined;
      }
      city = row[COLUMN_CITY] || city;
      const name = row[COLUMN_NAME];
      const locationId = createLocationId(county, city, name);

      // TODO photo handling
      // const photoRef = row[photoColumnKey];
      // console.log(photoRef);
      // https://en.wikipedia.org/w/api.php?format=json&action=query&titles=File:Crocodile_Rock,_Millport.jpg&prop=imageinfo&iiprop=user|extmetadata|url&iiextmetadatafilter=LicenseShortName

      const coordinates = parseCoordinates(
        row[COLUMN_LATITUDE],
        row[COLUMN_LONGITUDE]
      );

      const description = row[COLUMN_DESCRIPTION];
      const challenge = row[COLUMN_CHALLENGE];
      if (!coordinates) {
        console.warn("Incomplete location coordinates: ", sheetName, {
          [COLUMN_COUNTY]: county,
          [COLUMN_CITY]: city,
          [COLUMN_NAME]: row[COLUMN_NAME],
          [COLUMN_LATITUDE]: row[COLUMN_LATITUDE],
          [COLUMN_LONGITUDE]: row[COLUMN_LONGITUDE],
        });
        failCount++;
      } else if (!name || !county || !description || !challenge) {
        console.warn("Incomplete location information: ", sheetName, {
          [COLUMN_COUNTY]: county,
          [COLUMN_CITY]: city,
          ...row,
        });
        failCount++;
      } else {
        result.push({
          locationId,
          region: sheetName,
          county,
          city,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          name,
          description,
          challenge,
          photos: [],
        });
        successCount++;
      }
    });
  });

  console.log("success: ", successCount);
  console.log("fail: ", failCount);
  return result;
}

async function uploadToDynamoDB(locations: GGSLocation[]) {
  const locationsTableName = process.env.LOCATIONS_TABLE_NAME;
  console.log("Loading location data into DynamoDB", locationsTableName);

  for (let location of locations) {
    const result: PutItemOutput = await dynamodbClient.send(
      new PutItemCommand({
        TableName: locationsTableName,
        Item: marshall(location, { removeUndefinedValues: true }),
      })
    );
  }
}

export function checkSpreadsheet() {
  const locations = buildLocations(workbook);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  return locations.length;
}

export async function processSpreadsheet() {
  const locations = buildLocations(workbook);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  await uploadToDynamoDB(locations);
}
