import React from "react";
import CourseTitle from "../components/CourseTitleComponent";
import "../styles/CoursePage.css";

const courses = [
  {
    id: 1,
    title: "Programming Basics",
  },
  {
    id: 2,
    title: "Advanced Programming",
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
  },
  {
    id: 4,
    title: "Full-Stack Software Development",
  },
  {
    id: 5,
    title: "Database Management",
  },
  {
    id: 6,
    title: "Data Science",
  }
];

const CoursePage = () => {
  return (
    <div className="course-page">
      <h1 className="course-title">Available Courses</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseTitle key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};
export default CoursePage;
