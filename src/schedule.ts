import { Student, weekDict, timeDict } from "./interfaces";


export const buildSchedule = (student: Student) => {


    const schedule = {
        monday: {
            '08:00-12:00': '',
            '13:00-17:00': '',
            '18:00-22:00': ''
        },
        tuesday: {
            '08:00-12:00': '',
            '13:00-17:00': '',
            '18:00-22:00': ''
        },
        wednesday: {
            '08:00-12:00': '',
            '13:00-17:00': '',
            '18:00-22:00': ''
        },
        thursday: {
            '08:00-12:00': '',
            '13:00-17:00': '',
            '18:00-22:00': ''
        },
        friday: {
            '08:00-12:00': '',
            '13:00-17:00': '',
            '18:00-22:00': ''
        }
    } as { [key: string]: { [key: string]: string } };

    student.courses.forEach((course, index) => {
        schedule[weekDict[course.weekday.substring(0, 2)]][timeDict[course.weekday[course.weekday.length-1]]] = course.title;
    })

    return schedule
}