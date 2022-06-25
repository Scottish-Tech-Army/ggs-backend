import { dynamodbClient } from "./aws";
import { TEST_LOCATIONS_TABLE_NAME, TEST_SPREADSHEET_PATH } from "./setupTests";
import { buildLocations, checkSpreadsheet, processSpreadsheet } from "./index";
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
  photos: [],
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
  photos: { L: [] },
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
