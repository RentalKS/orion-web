function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const paymentData = [
    { name: 'Payment', value: 42141 },
    { name: 'Deposit', value: 41213 },
];

export const adjustedPaymentData = paymentData.every(item => item.value === 0)
    ? [...paymentData, { name: 'No data', value: 1, fill: 'gray' }]
    : paymentData;

export const COLORS = ['#8d55d6', '#3384ff', '#6fbf1f', '#ff9d21', '#adabc1', '#f55800'];

const generateDateLabels = (): string[] => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
    });
};

const dateLabels = generateDateLabels();

export const profitData = dateLabels.map((date) => ({
    name: date,
    rentals: Math.floor(Math.random() * 4000) + 1000,
    expenses: Math.floor(Math.random() * 4000) + 1000,
    extras: Math.floor(Math.random() * 4000) + 1000,
    deposit: Math.floor(Math.random() * 4000) + 1000,
    insurance: Math.floor(Math.random() * 4000) + 1000,
    taxes: Math.floor(Math.random() * 4000) + 1000
}));

export const rentalData = dateLabels.map((date) => ({
    name: date,
    reserved: getRandomNumber(0, 10),
    rental: getRandomNumber(0, 10),
    done: getRandomNumber(0, 10),
    canceled: getRandomNumber(0, 10),
}));