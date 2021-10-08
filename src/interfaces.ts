

export type Course = {
    courseNumber: string;
    title: string;
    // participants: Student[];
    weekDay: string;
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