import { Course, Student } from "./interfaces";
import * as _ from 'lodash'


export const buildSchedule = (student: Student) => {

    const studentCourses = student.courses;
    const usedDays = new Set()
    let schedule: {weekdayName: string, courses: Course[]}[] = []
    let sameDay: any[]

    studentCourses.forEach(course => {
        let courses: Course[] = []
        const weekdayName = course.weekDay
        // Go to next iteration if day already used
        if (usedDays.has(weekdayName)) return

        // Filter each day to get possible courses
        sameDay = studentCourses.filter(course => course.weekDay === weekdayName)
        sameDay.forEach(course => {
            const timeSlot = course.timeSlot
            const title = course.title
            const courseNumber = course.courseNumber
            const sheetsId = course.sheetsId
            // Add the day
            usedDays.add(weekdayName)
            courses.push({timeSlot, title, courseNumber, sheetsId})
        })
        
        const daySchedule = { weekdayName, courses }
        schedule.push(daySchedule)
    })
    //_.sortBy(schedule.courses, ["timeSlot"])

    return schedule
}