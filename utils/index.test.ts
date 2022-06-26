import { dynamodbClient } from "./aws";
import { TEST_LOCATIONS_TABLE_NAME, TEST_SPREADSHEET_PATH } from "./setupTests";
import {
  buildLocations,
  checkSpreadsheet,
  parseCoordinates,
  processSpreadsheet,
} from "./index";
var XLSX = require("xlsx");

jest.mock("./aws");

const EXPECTED_LOCATION_COUNT = 62;

// Expected test location from processing test spreadsheet
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
      attribution: "Bob Jones",
      copyright: "COPYRIGHT MESSAGE",
      url: "https://d9si0f25nnc9u.cloudfront.net/ayrshirenorth-dalry-lynnfalls.jpg",
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
          attribution: { S: "Bob Jones" },
          copyright: { S: "COPYRIGHT MESSAGE" },
          url: {
            S: "https://d9si0f25nnc9u.cloudfront.net/ayrshirenorth-dalry-lynnfalls.jpg",
          },
        },
      },
    ],
  },
  region: { S: "Ayrshire North" },
};

describe("buildLocations", () => {
  it("success response", async () => {
    var workbook = XLSX.readFile(TEST_SPREADSHEET_PATH);

    const result = buildLocations(workbook);

    // Check expected number of locations
    expect(result).toHaveLength(EXPECTED_LOCATION_COUNT);

    // Check form of sample location
    expect(result[INDEX_LYNN_FALLS]).toEqual(LOCATION_LYNN_FALLS);

    // Expect location with bad data to be filtered out
    expect(
      result.find((location) => location.name === "Dalhousie Arch")
    ).toBeUndefined();
  });
});

describe("checkSpreadsheet", () => {
  it("success response", () => {
    const result = checkSpreadsheet();

    expect(result).toEqual(EXPECTED_LOCATION_COUNT);

    expect(dynamodbClient.send).not.toHaveBeenCalled();
  });
});

describe("processSpreadsheet", () => {
  it("success response", async () => {
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
