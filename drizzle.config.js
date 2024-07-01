/** @type {import('drizzle-kit').Config} */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://postgresdb_owner:z42YgZehsHTd@ep-dry-hill-a1y9w5y1.ap-southeast-1.aws.neon.tech/recruit-ai?sslmode=require'
    }
  };