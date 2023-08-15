import * as https from 'https';
import { config } from '../config/config';
import Logger from './Logger';

interface MessageDestination {
  to: string;
}

interface PostData {
  messages: {
    destinations: MessageDestination[];
    from: string;
    text: string;
  }[];
}

function sendSMS(text: string) {
  const authorizationToken = `App ${config.infobipAPI.apiKey}`;

  const options: https.RequestOptions = {
    method: 'POST',
    hostname: '9rn5wy.api.infobip.com',
    path: '/sms/2/text/advanced',
    headers: {
      Authorization: authorizationToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  const postData: PostData = {
    messages: [
      {
        destinations: [{ to: config.infobipAPI.destination }],
        from: config.infobipAPI.sender,
        text: text
      }
    ]
  };

  const req = https.request(options, (res) => {
    const chunks: Buffer[] = [];

    res.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      Logger.info(body.toString());
    });

    res.on('error', (error) => {
      Logger.error(error);
    });
  });

  req.write(JSON.stringify(postData));
  req.end();
}

export { sendSMS };
