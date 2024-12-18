export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const convertToK = (amount) => {
    if (amount >= 1000) {
        return (amount / 1000) + 'K';
    } else {
        return amount.toString();
    }
}