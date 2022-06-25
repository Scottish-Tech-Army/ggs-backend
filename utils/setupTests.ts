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

process.env.LOCATIONS_TABLE_NAME = TEST_LOCATIONS_TABLE_NAME;
process.env.SOURCE_SPREADSHEET_PATH = TEST_SPREADSHEET_PATH;

beforeEach(() => {
  jest.resetAllMocks();
});
