import { Radar, SMSMessage } from '@/types/radar';
import { supabase } from './supabase';
import { twilioClient } from './twilio';

export async function sendNotification(radar: Radar) {
  const message = {
    to: radar.push_token,
    sound: 'default',
    title: `Hola ${radar.first_name}! `,
    body: '¿Como te encuentras?',
  };
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const { data, error } = await supabase
      .from('radar')
      .update({
        pending_notifications: radar.pending_notifications + 1,
      })
      .match({
        id: radar.id,
      });
  } catch (error) {
    console.error(
      `Failed to send push notification to ${radar.phone_number}`,
      error
    );
  }
}

const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

export function sendSMS(smsMessage: SMSMessage) {
  return (
    twilioClient.messages
      .create({
        body: `Hola ${smsMessage.contactName}! ¿Sabes algo de ${smsMessage.name} ${smsMessage.lastName}? Su Radar Violeta detecto algo inusual.`,
        from: twilioPhone,
        to: `+52${smsMessage.contactPhoneNumber}`,
      })
      // .then((message) => console.log(message.sid))
      .catch((error) => console.error(error))
  );
}
