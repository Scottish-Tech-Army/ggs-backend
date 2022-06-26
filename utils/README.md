# GGS data population utilities

Contains a utility to parse the GGS data spreadsheet and upload as locations to DynamoDB.

## Running

To prepare, create a `.env.local` file with the following contents

```
LOCATIONS_TABLE_NAME = name of DynamoDB table for locations (from backend CDK run)
SOURCE_SPREADSHEET_PATH = path to the GGS data spreadsheet
PHOTOS_BASEURL = URL of CloudFront distribution providing photos bucket
```

To run the utility, call one of the following: 
- `npm run check-locations` to attempt parsing of the spreadsheet, but not upload the results to DynamoDb.
- `npm run upload-locations` to upload the locations it can correctly parse and return errors for those it could not parse.
