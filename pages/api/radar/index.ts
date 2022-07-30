import { supabase } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const apiSecret = process.env.CHECKPOINT_CRON_SECRET;

interface Radar {
  id: number;
  last_checkpoint: string;
  radar_interval: number;
  last_location: Record<any, any>;
  user_id: number;
  active: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  contacts: Record<string, string>;
  push_token: string;
}

async function handleRadars() {
  const { data, error } = await supabase.rpc<Radar>('radars');
  const allNotifications = (data || []).map(async (radar) => {
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
          pending_notifications: 1,
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
  });
  await Promise.all(allNotifications);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  if (method === 'POST') {
    const { secret } = body;
    if (secret === apiSecret) {
      await handleRadars();

      res.status(200).json({ success: true });
    } else {
      res.status(401).send('Invalid authentication');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method not allowed` });
  }
}
