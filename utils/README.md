# GGS data population utilities

Contains a utility to parse the GGS data spreadsheet and upload as locations to DynamoDB.

## Running

To prepare, create a `.env.local` file with the following contents

```
LOCATIONS_TABLE_NAME = name of DynamoDB table for locations (from backend CDK run)
SOURCE_SPREADSHEET_PATH = path to the GGS data spreadsheet
```

To run the utility, call `npm run upload-locations`. It will upload the locations it can correctly parse and return errors for those it could not parse.
