import { PutItemCommand, PutItemOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
var XLSX = require("xlsx");
require("dotenv").config();
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

function getOrdinate(input: string | number): number {
  if (typeof input === "number") {
    return input;
  }

  return input ? parseFloat(input.trim()) : 0;
}

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

      // Quick & dirty processing of various lat/long formats
      // TODO either convert all to digital or parse deg/min/sec
      const latitude = getOrdinate(row[COLUMN_LATITUDE]);
      const longitude = -Math.abs(getOrdinate(row[COLUMN_LONGITUDE]));

      const description = row[COLUMN_DESCRIPTION];
      const challenge = row[COLUMN_CHALLENGE];
      if (
        !name ||
        !county ||
        !latitude ||
        !longitude ||
        !description ||
        !challenge
      ) {
        console.warn("Incomplete location: ", sheetName, {
          [COLUMN_COUNTY]: county,
          [COLUMN_CITY]: city,
          ...row,
        });
        failCount++;
      } else if (Number.isInteger(latitude) || Number.isInteger(longitude)) {
        // Unlikely to have an exact integer for an ordinate
        console.warn("Probably bad lat/long: ", sheetName, {
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
          latitude,
          longitude,
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
    console.log(result);
  }
}

export async function processSpreadsheet() {
  const locations = buildLocations(workbook);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  await uploadToDynamoDB(locations);
}
