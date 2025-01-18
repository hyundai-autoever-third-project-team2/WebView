export const calculateRegistrationFee = (price: number) => {
  // 취득세 (4%)
  const acquisitionTax = price * 0.04;

  // 등록세 (2%)
  const registrationTax = price * 0.02;

  // 공채매입비 (일반적으로 차량가격의 2.6% 정도)
  const bondFee = price * 0.026;

  // 인지세 (고정 3만원)
  const stampDuty = 3;

  // 총 이전등록비 계산
  const totalFee = acquisitionTax + registrationTax + bondFee + stampDuty;

  return Math.round(totalFee);
};
