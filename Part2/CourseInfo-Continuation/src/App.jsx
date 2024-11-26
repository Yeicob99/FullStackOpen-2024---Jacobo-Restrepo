import React from 'react';
import Course from './Components/Course';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

export {Header};


const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export {Content};

const App = () => {
  const course = {
    id: 1,
    title: 'Prueba',
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      {
        name: 'Node.js',
        id: 5,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 8
          }
        ]
      }
    ]
  };

  const totalExercises = course.parts.reduce((acc, part) => {
    if (part.exercises) {
      return acc + part.exercises;
    } else if (part.parts) {
      return acc + part.parts.reduce((acc, subPart) => acc + subPart.exercises, 0);
    } else {
      return acc;
    }
  }, 0);

  const totalExercises2 = course.parts.reduce((acc, part) => {
    if (part.parts) {
      return acc + part.parts.reduce((acc, subPart) => acc + subPart.exercises, 0);
    } else {
      return acc;
    }
  }, 0);

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={course} />
      <p><b>Total Exercises: {totalExercises}</b></p> 
      <p>{course.parts[4].parts[0].name} {course.parts[4].parts[0].exercises}</p>
      <p>{course.parts[4].parts[1].name} {course.parts[4].parts[1].exercises}</p>
      <p><b>Total Exercises: {totalExercises2}</b></p> 
    </div>
  );
};

export default App;