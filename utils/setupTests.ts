import fetchMock from "jest-fetch-mock";

// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
};

export const TEST_LOCATIONS_TABLE_NAME = "dbtable-locations";
export const TEST_SPREADSHEET_PATH = "testdata/DigitalSafariTESTDATA.xlsx";
export const TEST_PHOTOS_BASEURL = "http://localhost:12345";

process.env.LOCATIONS_TABLE_NAME = TEST_LOCATIONS_TABLE_NAME;
process.env.SOURCE_SPREADSHEET_PATH = TEST_SPREADSHEET_PATH;
process.env.PHOTOS_BASEURL = TEST_PHOTOS_BASEURL;

require("jest-fetch-mock").enableMocks();

beforeEach(() => {
  jest.resetAllMocks();
  fetchMock.resetMocks();
});
