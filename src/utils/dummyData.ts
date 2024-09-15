import { Segment } from "../components/ui/charts";

function getRandomInt(x: number, y: number) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
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
    Rentals: Math.floor(Math.random() * 4000) + 1000,
    Expenses: Math.floor(Math.random() * 4000) + 1000,
    Extras: Math.floor(Math.random() * 4000) + 1000,
    Deposit: Math.floor(Math.random() * 4000) + 1000,
    Insurance: Math.floor(Math.random() * 4000) + 1000,
    Taxes: Math.floor(Math.random() * 4000) + 1000
}));

export const rentalData = dateLabels.map((date) => ({
    name: date,
    Reserved: getRandomInt(0, 10),
    Rental: getRandomInt(0, 10),
    Done: getRandomInt(0, 10),
    Canceled: getRandomInt(0, 10),
}));

export const getRandomSegments = () => {
    const segments: Segment[] = [
        {
            title: "Rentals",
            value: getRandomInt(0, 9),
        },
        {
            title: "Returns",
            value: getRandomInt(0, 9),
        }
    ];

    return segments;
}