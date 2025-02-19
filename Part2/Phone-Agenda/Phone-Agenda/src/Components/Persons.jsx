import React from 'react';

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
