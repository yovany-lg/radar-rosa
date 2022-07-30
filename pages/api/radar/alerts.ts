import { sendNotification, sendSMS } from '@/lib/notifications';
import { supabase } from '@/lib/supabase';
import { Radar } from '@/types/radar';
import { NextApiRequest, NextApiResponse } from 'next';

const apiSecret = process.env.CHECKPOINT_CRON_SECRET;

async function handleAlerts() {
  const { data, error } = await supabase.rpc<Radar>('alerts');
  const allNotifications = (data || []).map(async (radar) => {
    await sendNotification(radar);
    if (radar.pending_notifications >= 2) {
      await sendSMS({
        name: radar.first_name,
        lastName: radar.last_name,
        contactName: radar.contacts.contact2Name,
        contactPhoneNumber: radar.contacts.contact2Phone,
      });
      await sendSMS({
        name: radar.first_name,
        lastName: radar.last_name,
        contactName: radar.contacts.contact1Name,
        contactPhoneNumber: radar.contacts.contact1Phone,
      });
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
      await handleAlerts();

      res.status(200).json({ success: true });
    } else {
      res.status(401).send('Invalid authentication');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method not allowed` });
  }
}
