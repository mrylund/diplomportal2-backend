import { Student } from "./interfaces";


export const buildSchedule = (student: Student) => {

    const courses = student.courses;
    let schedule: any[] = []

    courses.forEach(course => {
        const weekdayName = course.weekDay
        const weekdayTime = course.timeSlot
        const courseName = course.title
        const courseNumber = course.courseNumber
        const sheetsId = course.sheetsId
        const day = { weekdayName, weekdayTime, courseName, courseNumber, sheetsId }
        schedule.push(day)
    })

    return schedule
}