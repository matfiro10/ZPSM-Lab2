export type Subject = {
    name: string;
    grade: number;
    weight: number;
};

export type User = {
    firstName: string;
    lastName: string;
    subjects: Subject[];
};

export const users: User[] = [
    {
        firstName: "Anna",
        lastName: "Kowalska",
        subjects: [
            { name: 'Advanced Mobile Programming', grade: 4.5, weight: 3 },
            { name: 'Databases',                   grade: 4.0, weight: 2 },
            { name: 'Physical Education',          grade: 5.0, weight: 1 },
        ],
    },
    {
        firstName: "Jan",
        lastName: "Nowak",
        subjects: [
            { name: 'Advanced Mobile Programming', grade: 3.5, weight: 3 },
            { name: 'Databases',                   grade: 4.5, weight: 2 },
            { name: 'Physical Education',          grade: 4.0, weight: 1 },
        ]
    }
];