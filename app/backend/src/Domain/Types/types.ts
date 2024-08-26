export interface ITransactionResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: Date;
  transaction_status: string;
  fraud_status: string;
  actions: Action[];
  channel_response_code: string;
  channel_response_message: string;
  expiry_time: Date;
  va_numbers: { bank: string; va_number: string }[];
  permata_va_number: string;
  bill_key: string;
  biller_code: string;
}

export interface Action {
  name: string;
  method: string;
  url: string;
}
