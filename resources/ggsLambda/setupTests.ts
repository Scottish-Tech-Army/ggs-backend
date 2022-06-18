
// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

export const TEST_LOCATIONS_TABLE_NAME = "dbtable-locations";
export const TEST_UNITS_TABLE_NAME = "dbtable-units";

process.env.LOCATIONS_TABLE_NAME = TEST_LOCATIONS_TABLE_NAME;
process.env.UNITS_TABLE_NAME = TEST_UNITS_TABLE_NAME;

beforeEach(() => {
  jest.resetAllMocks();

});
