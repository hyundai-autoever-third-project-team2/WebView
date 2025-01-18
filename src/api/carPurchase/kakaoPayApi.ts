import { client } from 'utils/axiosInstance';

// 결제 대기 요청 타입
export interface PaymentReadyRequest {
  partner_order_id: string;
  partner_user_id: string;
  item_name: string;
  quantity: number;
  total_amount: number;
  tax_free_amount: number;
  approval_url: string;
  cancel_url: string;
  fail_url: string;
}

// 결제 승인 요청 타입
export interface PaymentApprovalRequest {
  pg_token: string;
  tid: string;
}

// 결제 승인 응답 타입
export interface PaymentApprovalResponse {
  aid: string;
  tid: string;
  cid: string;
  sid: string;
  partner_order_id: string;
  partner_user_id: string;
  payment_method_type: string;
  amount: {
    total: number;
    tax_free: number;
    vat: number;
    point: number;
    discount: number;
  };
  item_name: string;
  item_code: string;
  quantity: number;
  created_at: string;
  approved_at: string;
}

export const requestKakaoPayment = async (data: PaymentReadyRequest) => {
  try {
    const response = await client.post('/kakaopay/ready', {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Payment Error:', error);
    throw error;
  }
};

export const approveKakaoPayment = async (data: PaymentApprovalRequest) => {
  try {
    const response = await client.get('/kakaopay/success', {
      params: {
        pg_token: data.pg_token,
        tid: data.tid,
      },
    });
    return response.data as PaymentApprovalResponse;
  } catch (error) {
    console.error('Payment Approval Error:', error);
    throw error;
  }
};
