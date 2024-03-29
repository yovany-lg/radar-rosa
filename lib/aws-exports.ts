const awsmobile = {
  aws_project_region: 'us-west-2',
  aws_cognito_identity_pool_id: process.env.AWS_COGNITO_POOL_ID,
  aws_cognito_region: 'us-west-2',
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},

  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-2',
};

export default awsmobile;
