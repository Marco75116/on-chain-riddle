export interface WebhookPayload {
  created_at: string;
  event: {
    data: {
      new: any;
      old: any;
    };
    op: string;
  };
  table: {
    name: string;
    schema: string;
  };
}
