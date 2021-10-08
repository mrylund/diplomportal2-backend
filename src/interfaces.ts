

export type Course = {
    courseNumber: string;
    title: string;
    participants: Student[];
    weekDay: {day: string, period: Number}[];
}

export type Student = {
    studyNumber: string;
    name: string;
}