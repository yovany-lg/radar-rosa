export interface Radar {
  id: number;
  last_checkpoint: string;
  radar_interval: number;
  last_location: Record<any, any>;
  user_id: number;
  active: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  contacts: {
    contact1Name: string;
    contact1Phone: string;
    contact2Name: string;
    contact2Phone: string;
  };
  push_token: string;
  pending_notifications: number;
}

export interface SMSMessage {
  name: string;
  lastName: string;
  contactName: string;
  contactPhoneNumber: string;
}
