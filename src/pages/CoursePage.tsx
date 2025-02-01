import React from "react";
import CourseTitle from "../components/CourseTitleComponent";
import "../styles/CoursePage.css"; 

const courses = [
  {
    id: 1,
    title: "React Basics",
  },
  {
    id: 2,
    title: "Advanced Django",
  },
  {
    id: 3,
    title: "Full-Stack Development",
  },
  {
    id: 3,
    title: "Test 3",
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
