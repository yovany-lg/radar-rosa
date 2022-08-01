import AWS from 'aws-sdk';
import AWSConfig from './aws-exports';

export function sendSMSNotification(phone: string, msg: string) {
  if (phone && msg) {
    AWS.config.update(AWSConfig);
    const SNS = new AWS.SNS({ apiVersion: '2010-03-31' }),
      options = {
        Message: msg,
        PhoneNumber: phone,
        Subject: 'Example',
      };

    return new Promise((resolve, reject) => {
      SNS.publish(options, (err, data) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          console.log('Sms sent! Data: ', data);
          resolve(data);
        }
      });
    });
  }
}
