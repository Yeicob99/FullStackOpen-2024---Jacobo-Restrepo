import React from 'react';

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;