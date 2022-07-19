// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

type Data = {
  success: string;
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { body } = req;
    await client.messages.create({
      from: body.To,
      body: body.Body,
      to: body.From,
    });
    res.status(200).send({ success: 'Ok' });
    return;
  }
  res.status(200).json({ success: 'Ok' });
}
