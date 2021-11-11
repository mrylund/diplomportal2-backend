

export type Course = {
    courseNumber: string;
    title: string;
    // participants: Student[];
    weekDay: string;
    sheetsId: string;
}

export type Student = {
    studyNumber: string;
    name: string;
    courses: Course[];
    schedule: Day[];
}


export type Day = {
    weekDay: string;
    course: Course;
}
