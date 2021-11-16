

export type Course = {
    courseNumber: string;
    title: string;
    participants: Student[];
    weekDay: string;
    timeSlot: string;
    sheetsId: string;
}

export type Student = {
    studyNumber: string;
    name: string;
    courses: Course[];
    schedule: any;
}


export const weekDict = {
    'mo': 'monday',
    'ti': 'tuesday',
    'on': 'wednesday',
    'to': 'thursday',
    'fr': 'friday'
} as { [key: string]: string }

export const timeDict = {
    '0': '08:00-12:00',
    '1': '13:00-17:00',
    '2': '18:00-22:00',
} as { [key: string]: string }