import { Amplify, Auth, Storage } from 'aws-amplify';

function AmplifySetup() {
  /**
 * Initialize Cognito authentication
 */
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_AWS_REGION,
    },
    Storage: {
      AWSS3: {
        bucket: process.env.REACT_APP_S3_BUCKET,
        region: process.env.REACT_APP_AWS_REGION,
      },
    },
  });

  Auth.configure();

  const getCredentials = async () => {
    await Auth.currentCredentials();
  };

  getCredentials();

  // Configure S3 storage
  Storage.configure({
    customPrefix: {
      public: '',
    },
  });
}

export default AmplifySetup;
