export const formatPrice = (price: number) => {
    return `${(price / 10000).toFixed(0)}만원`;
};