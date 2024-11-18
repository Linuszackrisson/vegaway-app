# Instructions

- Create a `.env` file and add it to `.gitignore`.
- Add the following key/values pairs to `.env` (replace ... with correct values):

  - `VITE_APP_URL` - http://localhost:5174/
  - `VITE_INVOKE_URL` - ...
  - `VITE_COGNITO_DOMAIN` - ...
  - `VITE_COGNITO_REDIRECT_URI` - http://localhost:5174/callback
  - `VITE_COGNITO_USER_POOL_ID` - ...
  - `VITE_COGNITO_CLIENT_ID` - ...

## How to style Cognitos hosted UI

- **Log in to the AWS Management Console**

  - Navigate to the `Amazon Cognito` service.

- **Select Your User Pool**

  - In the `User Pools` section, choose the user pool you have deployed.

- **Open the App integration Section**

  - Make sure the `Cognito Domain` is the same as in your `.env` file
  - Scroll all the way down in the `App integration` section and open your `App client` in the `App client list`

- **Scroll to Hosted UI Customization section**

  - Click on `Use client-level settings`
  - Download `template.css`

- **Open template.css in editor**

  - Change values for the template classes

- **Upload the customized template file**
  - Click on `Choose file` and select the modified css file
  - Save changes
