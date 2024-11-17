# Instructions

- Create a `.env` file and add it to `.gitignore`.
- Add the following key/value pairs to `.env` (replace ... with correct values):
  - `SLS_ORG` - ...
  - `MY_ROLE_ARN` - ...
  - `API_KEY` - ...
  - `APP_URL` - http://localhost:5174/

The value for `APP_URL` will later be replaced with the URL to the hosted application in S3.

In the aws console, configure a domain for the cognito user pool.
