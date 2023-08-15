import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zzaqr0n.mongodb.net/todoApp`;

const SERVER_PORT = process.env.SERVER_PORT || 8080;

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  },
  infobipAPI: {
    sender: process.env.SMS_SENDER || 'InfoSMS',
    destination: process.env.SMS_DESTINATION || '',
    apiKey: process.env.INFOBIP_API_KEY || ''
  }
};
