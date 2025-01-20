import { approveKakaoPayment } from 'api/carPurchase/kakaoPayApi';
import { changeCarContractStatus } from 'api/carPurchase/reservationApi';
import Loading from 'components/common/Loading';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function PaymentRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isProcessingRef = useRef(false); // 처리 중인지 확인하는 ref 추가

  useEffect(() => {
    const approvePayment = async () => {
      // 이미 처리 중이면 중단
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      const searchParams = new URLSearchParams(location.search);
      const pg_token = searchParams.get('pg_token');
      const tid = localStorage.getItem('kakaoPayTid');

      console.log('Payment redirect page loaded');

      if (!pg_token || !tid) {
        console.error('PG Token or TID is missing');
        setError('PG Token or TID is missing');
        setIsLoading(false);
        isProcessingRef.current = false; // 처리 완료 표시
        return;
      }

      try {
        console.log('Attempting to approve payment');
        const approvalResponse = await approveKakaoPayment({
          pg_token: pg_token,
          tid: tid,
        });

        console.log('Payment approval response:', approvalResponse);

        if (approvalResponse) {
          const carId = localStorage.getItem('contractCarId');
          if (carId) {
            const response = await changeCarContractStatus(Number(carId));
            console.log('Car contract status changed: ', response);
          }

          navigate('/payment/complete', {
            state: {
              paymentResult: approvalResponse,
            },
          });
        }
      } catch (error) {
        console.error('Payment approval failed:', error);
        setError(error.message || 'An unknown error occurred');
        setIsLoading(false);
      } finally {
        isProcessingRef.current = false; // 처리 완료 표시
      }
    };

    approvePayment();
  }, [location, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <h1>Payment Failed</h1>
        <p>Error: {error}</p>
        <button onClick={() => navigate('/payment/fail')}>Go to Failure Page</button>
      </div>
    );
  }

  return null;
}
