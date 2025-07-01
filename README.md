# Cloud Service Dashboard with LaunchDarkly

This is a Proof of Concept (POC) application that demonstrates how to use LaunchDarkly feature flags to toggle between different cloud service providers (GCP, AWS, Azure) in a React application.

## Features

- **Feature Flags**: Toggle cloud services on/off using LaunchDarkly
- **User Segmentation**: Different features for different user segments (internal/external)
- **Real-time Updates**: Changes in LaunchDarkly reflect immediately in the app
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A LaunchDarkly account with a client-side ID

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd launchdarkly-cloud-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure LaunchDarkly**
   - Create a new project in LaunchDarkly
   - Create three feature flags:
     - `gcp-enabled` (boolean)
     - `aws-enabled` (boolean)
     - `azure-enabled` (boolean)
   - Create user segments (e.g., internal users, external users)
   - Set up targeting rules based on user attributes

4. **Configure the application**
   - Copy `.env.example` to `.env`
   - Update the LaunchDarkly client ID in `.env`

5. **Start the development server**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/App.tsx` - Main application component with LaunchDarkly integration
- `src/App.css` - Styling for the application
- `src/index.tsx` - Application entry point

## LaunchDarkly Configuration

### Feature Flags

1. **gcp-enabled**
   - Type: Boolean
   - Description: Controls the visibility of GCP services
   - Default: false

2. **aws-enabled**
   - Type: Boolean
   - Description: Controls the visibility of AWS services
   - Default: false

3. **azure-enabled**
   - Type: Boolean
   - Description: Controls the visibility of Azure services
   - Default: false

### User Segments

1. **Internal Users**
   - Rule: User email ends with "@yourcompany.com"
   - Access: All features enabled

2. **External Users**
   - Rule: All other users
   - Access: Features enabled based on targeting rules

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_LAUNCHDARKLY_CLIENT_ID=your-client-side-id
```

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build the application for production
- `npm run eject` - Eject from Create React App (advanced)

## License

This project is licensed under the MIT License.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
