import { Segment } from "../components/ui/charts";
import { DataType } from "../features/planner";

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

export const reserveData: DataType[] = [
    {
        key: '1',
        id: '1',
        amount: "310",
        status: ["Paid"],
        dates: '10 Sep. - 20 Sep.',
        client: "John Doe",
        vehicle: "Audi A4",
        expendable: true
    },
    {
        key: '2',
        id: '2',
        amount: "450",
        status: ["Pending"],
        dates: '15 Sep. - 25 Sep.',
        client: "Jane Smith",
        vehicle: "BMW X5"
    },
    {
        key: '3',
        id: '3',
        amount: "620",
        status: ["Paid"],
        dates: '12 Sep. - 22 Sep.',
        client: "David Johnson",
        vehicle: "Mercedes C-Class"
    },
    {
        key: '4',
        id: '4',
        amount: "520",
        status: ["Cancelled"],
        dates: '8 Sep. - 18 Sep.',
        client: "Sarah Brown",
        vehicle: "Tesla Model 3",
        expendable: true
    },
    {
        key: '5',
        id: '5',
        amount: "740",
        status: ["Pending"],
        dates: '17 Sep. - 27 Sep.',
        client: "Michael Davis",
        vehicle: "Ford Mustang",
        expendable: true
    },
    {
        key: '6',
        id: '6',
        amount: "395",
        status: ["Paid"],
        dates: '11 Sep. - 21 Sep.',
        client: "Emily Wilson",
        vehicle: "Honda Accord"
    },
    {
        key: '7',
        id: '7',
        amount: "285",
        status: ["Cancelled"],
        dates: '9 Sep. - 19 Sep.',
        client: "James Miller",
        vehicle: "Toyota Corolla"
    }

];

export const timelineData = [
    {
        taskID: 1,
        taskName: 'Project schedule',
        startDate: new Date('02/08/2024'),
        endDate: new Date('03/15/2024'),
        subtasks: [
            {
                taskID: 2,
                taskName: 'Planning',
                startDate: new Date('02/08/2024'),
                endDate: new Date('02/12/2024'),
                subtasks: [
                    {
                        taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 4, taskName: 'Plan budget', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/08/2024'),
                        endDate: new Date('02/12/2024'), duration: 5, progress: '100', resourceId: [1]
                    },
                    {
                        taskID: 6, taskName: 'Planning complete', startDate: new Date('02/10/2024'),
                        endDate: new Date('02/10/2024'), duration: 0, predecessor: '3FS,4FS,5FS'
                    }
                ]
            }, {
                taskID: 7,
                taskName: 'Design',
                startDate: new Date('02/15/2024'),
                endDate: new Date('02/19/2024'),
                subtasks: [
                    {
                        taskID: 8, taskName: 'Software specification', startDate: new Date('02/15/2024'),
                        endDate: new Date('02/17/2024'), duration: 3, progress: '60', predecessor: '6FS', resourceId: [2]
                    },
                    {
                        taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/15/2024'),
                        endDate: new Date('02/17/2024'), duration: 3, progress: '100', predecessor: '6FS', resourceId: [3]
                    },
                    {
                        taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/18/2024'),
                        endDate: new Date('02/19/2024'), duration: 2, progress: '100', predecessor: '9FS', resourceId: [1]
                    },
                    {
                        taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024'),
                        endDate: new Date('02/17/2024'), duration: 0, predecessor: '10FS'
                    }
                ]
            },
            {
                taskID: 12,
                taskName: 'Implementation phase',
                startDate: new Date('02/25/2024'),
                endDate: new Date('03/05/2024'),
                subtasks: [
                    {
                        taskID: 13,
                        taskName: 'Phase 1',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/07/2024'),
                        subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation module 1',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/07/2024'),
                            subtasks: [
                                {
                                    taskID: 15, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 16, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', predecessor: '11FS', resourceId: [3]
                                },
                                {
                                    taskID: 17, taskName: 'Testing', startDate: new Date('02/25/2024'),
                                    endDate: new Date('02/26/2024'), duration: 2, progress: '0', predecessor: '15FS,16FS', resourceId: [4]
                                },
                                {
                                    taskID: 18, taskName: 'Bug fix', startDate: new Date('03/01/2024'),
                                    endDate: new Date('03/02/2024'), duration: 2, progress: '0', predecessor: '17FS', resourceId: [3]
                                },
                                {
                                    taskID: 19, taskName: 'Customer review meeting', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/07/2024'), duration: 2, progress: '0', predecessor: '18FS', resourceId: [1]
                                },
                                {
                                    taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('03/05/2024'),
                                    endDate: new Date('03/05/2024'), duration: 0, predecessor: '19FS'
                                }
                            ]
                        }]
                    },
                    {
                        taskID: 21,
                        taskName: 'Phase 2',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/05/2024'),
                        subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation module 2',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/05/2024'),
                            subtasks: [
                                {
                                    taskID: 23, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/25/2024'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 24, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/25/2024'), duration: 4, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 25, taskName: 'Testing', startDate: new Date('02/26/2024'),
                                    endDate: new Date('03/01/2024'), duration: 2, progress: '0', predecessor: '23FS,24FS', resourceId: [4]
                                },
                                {
                                    taskID: 26, taskName: 'Bug fix', startDate: new Date('03/02/2024'),
                                    endDate: new Date('03/03/2024'), duration: 2, progress: '0', predecessor: '25FS', resourceId: [3]
                                },
                                {
                                    taskID: 27, taskName: 'Customer review meeting', startDate: new Date('03/07/2024'),
                                    endDate: new Date('03/09/2024'), duration: 2, progress: '0', predecessor: '26FS', resourceId: [1]
                                },
                                {
                                    taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/03/2024'), duration: 0, predecessor: '27FS'
                                }
                            ]
                        }]
                    },
                    {
                        taskID: 29,
                        taskName: 'Phase 3',
                        startDate: new Date('02/25/2024'),
                        endDate: new Date('03/07/2024'),
                        subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation module 3',
                            startDate: new Date('02/25/2024'),
                            endDate: new Date('03/07/2024'),
                            subtasks: [
                                {
                                    taskID: 31, taskName: 'Development task 1', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 32, taskName: 'Development task 2', startDate: new Date('02/22/2024'),
                                    endDate: new Date('02/24/2024'), duration: 3, progress: '50', resourceId: [3]
                                },
                                {
                                    taskID: 33, taskName: 'Testing', startDate: new Date('02/25/2024'), endDate: new Date('02/26/2024'),
                                    duration: 2, progress: '0', predecessor: '31FS,32FS', resourceId: [4]
                                },
                                {
                                    taskID: 34, taskName: 'Bug fix', startDate: new Date('03/01/2024'), endDate: new Date('03/05/2024'),
                                    duration: 2, progress: '0', predecessor: '33FS', resourceId: [3]
                                },
                                {
                                    taskID: 35, taskName: 'Customer review meeting', startDate: new Date('03/03/2024'),
                                    endDate: new Date('03/04/2024'), duration: 2, progress: '0', predecessor: '34FS',
                                    resourceId: [1]
                                },
                                {
                                    taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('03/02/2024'),
                                    endDate: new Date('03/02/2024'), duration: 0, predecessor: '35FS'
                                },
                            ]
                        }]
                    }
                ]
            },
            {
                taskID: 37, taskName: 'Integration', startDate: new Date('03/08/2024'), endDate: new Date('03/10/2024'), duration: 3,
                progress: '0', predecessor: '20FS,28FS,36FS', resourceId: [3]
            },
            {
                taskID: 38, taskName: 'Final testing', startDate: new Date('03/11/2024'), endDate: new Date('03/12/2024'), duration: 2,
                progress: '0', predecessor: '37FS', resourceId: [4]
            },
            {
                taskID: 39, taskName: 'Final delivery', startDate: new Date('03/10/2024'), endDate: new Date('03/10/2024'),
                duration: 0, predecessor: '38FS'
            }
        ]
    }
];