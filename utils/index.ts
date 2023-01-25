import { PutItemCommand, PutItemOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
var XLSX = require("xlsx");
require("dotenv").config({ path: ".env.local" });
import { dynamodbClient } from "./aws";
import { PHOTO_LINKS } from "./photoLinks";
require("isomorphic-fetch");

type GGSPhoto = {
  url: string;
  originalUrl?: string;
  copyright?: string;
  attribution?: string;
};

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
  photos: GGSPhoto[];
};

type WikimediaPhoto = {
  imageUrl: string;
  filename: string;
  originalUrl: string;
  attribution: string;
  copyright: string;
};

const COLUMN_COUNTY = "County";
const COLUMN_CITY = "City/town";
const COLUMN_NAME = "Name of location";
const COLUMN_LATITUDE = "Latitude";
const COLUMN_LONGITUDE = "Longitude";
const COLUMN_DESCRIPTION = "Description of map point";
const COLUMN_CHALLENGE = "Challenge";

const ROWS_TO_SKIP = 0;

const PHOTOS_BASEURL = process.env.PHOTOS_BASEURL;

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

export async function getWikimediaPhotoData(
  wikiUrl: string
): Promise<WikimediaPhoto> {
  const wikiFile = wikiUrl.substring(
    "https://commons.wikimedia.org/wiki/File:".length
  );

  const queryUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&titles=File:${wikiFile}&prop=imageinfo&iiprop=user|extmetadata|url&iiextmetadatafilter=LicenseShortName&iiurlwidth=640`;

  const response = await fetch(queryUrl, { method: "GET" })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
  const imageinfo = (Object.values(response.query.pages)[0] as any)
    .imageinfo[0];
  return {
    imageUrl: imageinfo.thumburl,
    filename: imageinfo.thumburl.split("/").pop(),
    originalUrl: wikiUrl,
    attribution: imageinfo.user,
    copyright: imageinfo.extmetadata.LicenseShortName.value,
  };
}

let photoLinkCount = 0;
let photoFileCount = 0;

export async function getPhotos(locationId: string, photoRef: string) {
  const photos: GGSPhoto[] = [];

  if (PHOTO_LINKS[photoRef]) {
    // Already processed linked (or file with attribution) photo - skip fetching again
    console.log("Using archived photo link", photoRef);
    const archivedPhoto = PHOTO_LINKS[photoRef];
    photos.push({
      url: `${PHOTOS_BASEURL}/${archivedPhoto.file}`,
      attribution: archivedPhoto.attribution,
      copyright: archivedPhoto.copyright,
      originalUrl: archivedPhoto.originalUrl,
    });
    photoLinkCount++;
  } else if (photoRef?.startsWith("https://commons.wikimedia.org/wiki/File:")) {
    // Linked wikimedia photo
    const wikiPhotoData = await getWikimediaPhotoData(photoRef);
    // Throttle fetch rate to avoid annoying wikimedia
    await new Promise((r) => setTimeout(r, 2000));
    const photo = {
      url: `${PHOTOS_BASEURL}/${wikiPhotoData.filename}`,
      attribution: wikiPhotoData.attribution,
      copyright: wikiPhotoData.copyright,
      originalUrl: wikiPhotoData.originalUrl,
    };
    console.log("Upload this photo to the photos bucket:");
    console.log(wikiPhotoData.imageUrl);
    console.log("Then add the following to PHOTO_LINKS:");
    console.log(
      `"${photoRef}": ${JSON.stringify({
        file: wikiPhotoData.filename,
        attribution: wikiPhotoData.attribution,
        copyright: wikiPhotoData.copyright,
        originalUrl: wikiPhotoData.originalUrl,
      })},`
    );
    photos.push(photo);
    photoLinkCount++;
  } else if (photoRef?.includes("http")) {
    // Linked photo - manually process and add to PHOTO_LINKS
    console.log("Unprocessed photo link", locationId, photoRef);
    photoLinkCount++;
  } else if (photoRef) {
    // File photo - no attribution or copyright requested
    photos.push({
      url: `${PHOTOS_BASEURL}/${locationId}.jpg`,
    });
    console.log("Photo file", `${locationId}.jpg`);
    
    photoFileCount++;
  }
  return photos;
}

export async function buildLocations(workbook: any): Promise<GGSLocation[]> {
  let successCount = 0;
  let failCount = 0;
  photoLinkCount = 0;
  photoFileCount = 0;
  const result: GGSLocation[] = [];

  for (let sheetName of sheetNames) {
    const contents = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      range: ROWS_TO_SKIP,
    });
    // TODO photo handling
    let photoColumnKey = getPhotoColumnKey(contents);

    console.log("Sheet", sheetName);

    // Some column values carry forward (ie not populated in succeeding rows)
    let county: string = "";
    let city: string | undefined = undefined;

    for (let row of contents) {
      // console.log(row);
      
      const newCounty = row[COLUMN_COUNTY];
      if (newCounty) {
        county = newCounty;
        city = undefined;
      }
      city = row[COLUMN_CITY] || city;
      const name = row[COLUMN_NAME];
      const locationId = createLocationId(county, city, name);

      const photos: GGSPhoto[] = await getPhotos(
        locationId,
        row[photoColumnKey]
      );

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
        }, row);
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
          photos,
        });
        successCount++;
      }
    }
  }

  console.log("success: ", successCount);
  console.log("fail: ", failCount);
  console.log("photo links: ", photoLinkCount);
  console.log("photo files: ", photoFileCount);
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

export async function checkSpreadsheet() {
  const locations = await buildLocations(workbook);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  return locations.length;
}

export async function processSpreadsheet() {
  const locations = await buildLocations(workbook);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  await uploadToDynamoDB(locations);
}
