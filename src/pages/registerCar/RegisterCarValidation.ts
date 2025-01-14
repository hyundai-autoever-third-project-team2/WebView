export const firstStepValidation = (data: string | string[]) => {
  const regex = /^\d{2,3}[ㄱ-힣]\d{4}$/;
  const cleanedData = (data as string).replace(/\s/g, '');
  if (regex.test(cleanedData)) {
    return true;
  }

  return false;
};

export const secondStepValidation = (data: string | string[]) => {
  if (typeof data !== 'string' && data.length === 4) {
    return true;
  }

  return false;
};

export const thirdStepValidation = (data: string | string[]) => {
  if (typeof data === 'string' && data.length > 0) {
    return true;
  }

  return false;
};
