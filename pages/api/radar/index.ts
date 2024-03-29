import { sendNotification } from '@/lib/notifications';
import { supabase } from '@/lib/supabase';
import { Radar } from '@/types/radar';
import { NextApiRequest, NextApiResponse } from 'next';

const apiSecret = process.env.CHECKPOINT_CRON_SECRET;

async function handleRadars() {
  const { data, error } = await supabase.rpc<Radar>('radars');
  const allNotifications = (data || []).map(async (radar) => {
    await sendNotification(radar);
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
