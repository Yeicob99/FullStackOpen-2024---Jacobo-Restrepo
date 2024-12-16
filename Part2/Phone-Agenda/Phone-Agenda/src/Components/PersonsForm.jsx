import React from 'react';
const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
    <h2>Add person and Phone number</h2>
        
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;