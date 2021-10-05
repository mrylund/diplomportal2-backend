import { Course, Student } from "./interfaces";

export const students: Student[] = [{
    name: 'Patrick Lopdrup Hansen',
    studyNumber: 's185092'
}, {
    name: 'Rasmus Strange Jakobsen',
    studyNumber: 's152716'
}]

export const courses: Course[] = [{
        courseNumber: '62582',
        title: 'Komplekse systemer og Devops',
        participants: students
    }, {
        courseNumber: '62598',
        title: 'Kunstig intelligens i computerspil',
        participants: students
    }, {
        courseNumber: '12345',
        title: 'Giraffer',
        participants: students
    }
]
