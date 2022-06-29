import { dynamodbClient } from "./aws";
import {
  TEST_LOCATIONS_TABLE_NAME,
  TEST_PHOTOS_BASEURL,
  TEST_SPREADSHEET_PATH,
} from "./setupTests";
import {
  buildLocations,
  checkSpreadsheet,
  getPhotos,
  getWikimediaPhotoData,
  parseCoordinates,
  processSpreadsheet,
} from "./index";
var XLSX = require("xlsx");
import fetchMock from "jest-fetch-mock";

jest.mock("./aws");

const WIKIMEDIA_URL =
  "https://commons.wikimedia.org/wiki/File:Crocodile_Rock,_Millport.jpg";
const WIKIMEDIA_REQUEST =
  "https://en.wikipedia.org/w/api.php?format=json&action=query&titles=File:Crocodile_Rock,_Millport.jpg&prop=imageinfo&iiprop=user|extmetadata|url&iiextmetadatafilter=LicenseShortName&iiurlwidth=640";

const WIKIMEDIA_FILENAME = "640px-Crocodile_Rock%2C_Millport.jpg";
const WIKIMEDIA_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Crocodile_Rock%2C_Millport.jpg/" +
  WIKIMEDIA_FILENAME;

const WIKIMEDIA_RESPONSE = JSON.stringify({
  batchcomplete: "",
  query: {
    normalized: [
      {
        from: "File:Crocodile_Rock,_Millport.jpg",
        to: "File:Crocodile Rock, Millport.jpg",
      },
    ],
    pages: {
      "-1": {
        ns: 6,
        title: "File:Crocodile Rock, Millport.jpg",
        missing: "",
        known: "",
        imagerepository: "shared",
        imageinfo: [
          {
            user: "DeFacto",
            thumburl: WIKIMEDIA_IMAGE_URL,
            thumbwidth: 640,
            thumbheight: 400,
            responsiveUrls: {
              "1.5":
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Crocodile_Rock%2C_Millport.jpg/960px-Crocodile_Rock%2C_Millport.jpg",
              "2": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Crocodile_Rock%2C_Millport.jpg/1280px-Crocodile_Rock%2C_Millport.jpg",
            },
            url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Crocodile_Rock%2C_Millport.jpg",
            descriptionurl:
              "https://commons.wikimedia.org/wiki/File:Crocodile_Rock,_Millport.jpg",
            descriptionshorturl:
              "https://commons.wikimedia.org/w/index.php?curid=43411470",
            extmetadata: {
              LicenseShortName: {
                value: "CC BY-SA 4.0",
                source: "commons-desc-page",
                hidden: "",
              },
            },
          },
        ],
      },
    },
  },
});

const EXPECTED_LOCATION_COUNT = 62;

// Expected test locations from processing test spreadsheet
const INDEX_LYNN_FALLS = 42;

const LOCATION_LYNN_FALLS = expect.objectContaining({
  challenge: "Try your hand at some nature photography!",
  city: "Dalry",
  county: "Ayrshire North",
  description: expect.stringContaining(
    "A short walk in a beautiful wooded glen"
  ),
  latitude: 55.700427690836655,
  locationId: "ayrshirenorth-dalry-lynnfalls",
  longitude: -4.73272769919101,
  name: "Lynn Falls ",
  photos: [
    {
      url: `${TEST_PHOTOS_BASEURL}/ayrshirenorth-dalry-lynnfalls.jpg`,
    },
  ],
  region: "Ayrshire North",
});

const DYNAMODB_LYNN_FALLS = {
  challenge: { S: "Try your hand at some nature photography!" },
  city: { S: "Dalry" },
  county: { S: "Ayrshire North" },
  description: {
    S: expect.stringContaining("A short walk in a beautiful wooded glen"),
  },
  latitude: { N: "55.700427690836655" },
  locationId: { S: "ayrshirenorth-dalry-lynnfalls" },
  longitude: { N: "-4.73272769919101" },
  name: { S: "Lynn Falls " },
  photos: {
    L: [
      {
        M: {
          url: {
            S: `${TEST_PHOTOS_BASEURL}/ayrshirenorth-dalry-lynnfalls.jpg`,
          },
        },
      },
    ],
  },
  region: { S: "Ayrshire North" },
};

const INDEX_CROCODILE_ROCK = 33;

const LOCATION_CROCODILE_ROCK = expect.objectContaining({
  challenge: "Draw your own crocodile masterpiece!",
  city: "Millport",
  county: "Ayrshire North",
  description: expect.stringContaining(
    "Crocodile Rock is an iconic Millport landmark"
  ),
  latitude: 55.75308162268832,
  locationId: "ayrshirenorth-millport-crocodilerock",
  longitude: -4.92252593043097,
  name: "Crocodile Rock",
  photos: [
    {
      attribution: "DeFacto",
      copyright: "CC BY-SA 4.0",
      originalUrl: WIKIMEDIA_URL,
      url: `${TEST_PHOTOS_BASEURL}/640px-Crocodile_Rock%2C_Millport.jpg`,
    },
  ],
  region: "Ayrshire North",
});

describe("buildLocations", () => {
  it("success response", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    var workbook = XLSX.readFile(TEST_SPREADSHEET_PATH);

    const result = await buildLocations(workbook);

    // Check expected number of locations
    expect(result).toHaveLength(EXPECTED_LOCATION_COUNT);

    // Check form of sample location - photo file
    expect(result[INDEX_LYNN_FALLS]).toEqual(LOCATION_LYNN_FALLS);

    // Check form of sample location - photo wiki link
    expect(result[INDEX_CROCODILE_ROCK]).toEqual(LOCATION_CROCODILE_ROCK);

    // Expect location with bad data to be filtered out
    expect(
      result.find((location) => location.name === "Dalhousie Arch")
    ).toBeUndefined();
  });
});

describe("checkSpreadsheet", () => {
  it("success response", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    const result = await checkSpreadsheet();

    expect(result).toEqual(EXPECTED_LOCATION_COUNT);

    expect(dynamodbClient.send).not.toHaveBeenCalled();
  });
});

describe("processSpreadsheet", () => {
  it("success response", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    await processSpreadsheet();

    expect(dynamodbClient.send).toHaveBeenCalledTimes(EXPECTED_LOCATION_COUNT);
    expect(dynamodbClient.send).toHaveBeenNthCalledWith(
      INDEX_LYNN_FALLS + 1,
      expect.objectContaining({
        input: {
          Item: DYNAMODB_LYNN_FALLS,
          TableName: TEST_LOCATIONS_TABLE_NAME,
        },
      })
    );
  });
});

describe("parseCoordinates", () => {
  it("success response with string decimal values", async () => {
    expect(parseCoordinates("55.76281N", "-4.014507E")).toEqual({
      latitude: 55.76281,
      longitude: -4.014507,
    });

    // Handle wrong longitude direction
    expect(parseCoordinates("55.79656N", "-4.0262W")).toEqual({
      latitude: 55.79656,
      longitude: -4.0262,
    });

    // Extra characters
    expect(parseCoordinates("57.6512° N", "3.3055° W")).toEqual({
      latitude: 57.6512,
      longitude: -3.3055,
    });
    expect(
      parseCoordinates("56.2941 / 56°17'38\"N", "-3.7127 / 3°42'45\"W")
    ).toEqual({
      latitude: 56.2941,
      longitude: -3.7127,
    });
  });

  it("success response with numeric decimal values", async () => {
    expect(parseCoordinates(57.13254, -2.20171)).toEqual({
      latitude: 57.13254,
      longitude: -2.20171,
    });

    // In cases where longitude is missing sign
    expect(parseCoordinates(55.7814, 4.2961)).toEqual({
      latitude: 55.7814,
      longitude: -4.2961,
    });

    // High precision
    expect(parseCoordinates(56.0007889699862, -3.84045798674573)).toEqual({
      latitude: 56.0007889699862,
      longitude: -3.84045798674573,
    });
  });

  it("success response with degree minute seconds values", async () => {
    expect(parseCoordinates("56°07'23.3\"N", "3°07'23.1\"W")).toEqual({
      latitude: 56.12313888888889,
      longitude: -3.123083333333333,
    });

    expect(parseCoordinates("56° 07' 23.3 \"N", "3° 07 ' 23.1 \"W")).toEqual({
      latitude: 56.12313888888889,
      longitude: -3.123083333333333,
    });

    expect(parseCoordinates("57°36′58′′N", "3°31′27.55′′W")).toEqual({
      latitude: 57.61611111111111,
      longitude: -3.5243194444444446,
    });

    expect(parseCoordinates("56°07'23\"N", "3°07'23\"W")).toEqual({
      latitude: 56.12305555555555,
      longitude: -3.1230555555555557,
    });
  });

  it("fail with missing latitude", async () => {
    expect(parseCoordinates(57.13254, undefined)).toBeUndefined();
  });

  it("fail with missing longitude", async () => {
    expect(parseCoordinates(undefined, -2.20171)).toBeUndefined();
  });

  it("fail with missing decimal point", async () => {
    expect(parseCoordinates(56731548, -2.660825)).toBeUndefined();
    expect(parseCoordinates(56.731548, -2660825)).toBeUndefined();
    expect(parseCoordinates(56731548, -2660825)).toBeUndefined();
  });

  it("fail with missing seconds", async () => {
    expect(parseCoordinates("56° 13' N", "2 41' W")).toBeUndefined();
  });

  it("fail with transposed latitude and longitude", async () => {
    expect(parseCoordinates(-2.20171, 57.13254)).toBeUndefined();
  });

  it("fail with invalid input", async () => {
    expect(parseCoordinates("XXX", "YYY")).toBeUndefined();
  });
});

describe("getWikimediaPhotoData", () => {
  it("success response", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    const result = await getWikimediaPhotoData(WIKIMEDIA_URL);

    expect(result).toEqual({
      imageUrl: WIKIMEDIA_IMAGE_URL,
      filename: WIKIMEDIA_FILENAME,
      originalUrl: WIKIMEDIA_URL,
      attribution: "DeFacto",
      copyright: "CC BY-SA 4.0",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(WIKIMEDIA_REQUEST, {
      method: "GET",
    });
  });
});

describe("getPhotos", () => {
  const LOCATION_ID = "new-location";
  const ATTRIBUTION_NAME = "Its my photo";
  const ARCHIVED_PHOTO_REF =
    "https://commons.wikimedia.org/wiki/File:DSCF1764_Johnston_Gardens_Aberdeen.jpg";

  it("success response with archived photo", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    const result = await getPhotos(LOCATION_ID, ARCHIVED_PHOTO_REF);

    expect(result).toEqual([
      {
        attribution: "AlasdairW",
        copyright: "CC BY-SA 3.0",
        originalUrl:
          "https://commons.wikimedia.org/wiki/File:DSCF1764_Johnston_Gardens_Aberdeen.jpg",
        url: `${TEST_PHOTOS_BASEURL}/640px-DSCF1764_Johnston_Gardens_Aberdeen.jpg`,
      },
    ]);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("success response with wikimedia photo", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    const result = await getPhotos(LOCATION_ID, WIKIMEDIA_URL);

    expect(result).toEqual([
      {
        attribution: "DeFacto",
        copyright: "CC BY-SA 4.0",
        originalUrl: WIKIMEDIA_URL,
        url: `${TEST_PHOTOS_BASEURL}/${WIKIMEDIA_FILENAME}`,
      },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(WIKIMEDIA_REQUEST, {
      method: "GET",
    });
  });

  it("success response with file photo", async () => {
    fetchMock.mockResponse(WIKIMEDIA_RESPONSE);

    const result = await getPhotos(LOCATION_ID, "Local file.jpg");

    expect(result).toEqual([
      {
        url: `${TEST_PHOTOS_BASEURL}/new-location.jpg`,
      },
    ]);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
