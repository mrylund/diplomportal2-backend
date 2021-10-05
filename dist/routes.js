"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentById = exports.getStudents = exports.getCourseById = exports.getCourses = void 0;
const dummy = require("./dummy");
const getCourses = async (req, res) => {
    // Hentes fra db senere, bla bla
    const courses = dummy.courses;
    courses
        ? res.json(courses)
        : res.status(400).send({
            message: 'Could not fetch courses.'
        });
};
exports.getCourses = getCourses;
const getCourseById = async (req, res) => {
    const course = dummy.courses.find(course => course.courseNumber === req.params.id);
    course
        ? res.json(course)
        : res.status(400).send({
            message: `Could not fetch course with id ${req.params.id}.`
        });
};
exports.getCourseById = getCourseById;
const getStudents = async (req, res) => {
    const students = dummy.students;
    students
        ? res.json(students)
        : res.status(400).send({
            message: 'Could not fetch students.'
        });
};
exports.getStudents = getStudents;
const getStudentById = async (req, res) => {
    const student = dummy.students.find(student => student.studyNumber === req.params.id);
    student
        ? res.json(student)
        : res.status(400).send({
            message: `Could not fetch student with id ${req.params.id}.`
        });
};
exports.getStudentById = getStudentById;
//# sourceMappingURL=routes.js.map