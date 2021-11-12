

export type Course = {
    courseNumber: string;
    title: string;
    participants: Student[];
    weekDay: string;
    sheetsId: string;
}

export type Student = {
    studyNumber: string;
    name: string;
    courses: Course[];
    schedule: Schedule
}


export type Schedule = {
    courses: Course[];
}

export type weekDict = {
    'mo': 'Mandag',
    'ti': 'Tirsdag',
    'on': 'Onsdag',
    'to': 'Torsdag',
    'fr': 'Fredag'
}

export type timeDict = {
    // '0': {'start': '08:00', 'end': '12:00'},
    // '1': {'start': '13:00', 'end': '17:00'},
    // '2': {'start': '18:00', 'end': '22:00'}
    '0': '08:00-12:00',
    '1': '13:00-17:00',
    '2': '18:00-22:00',
}