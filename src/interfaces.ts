

export type Course = {
    courseNumber: string;
    title: string;
    participants: Student[];
}

export type Student = {
    studyNumber: string;
    name: string;
}