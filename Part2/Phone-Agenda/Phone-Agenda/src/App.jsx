import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonsForm';
import Persons from './Components/Persons';
import personService from './Services/personService';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        setSuccessMessage({ text: 'Failed to fetch contacts.', type: 'error' });
        setTimeout(() => setSuccessMessage(null), 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setSuccessMessage({ text: `${newName} updated successfully`, type: 'success' });
            setTimeout(() => setSuccessMessage(null), 5000);
          })
          .catch(error => {
            alert(`The contact '${existingPerson.name}' was already removed from the server.`);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setSuccessMessage({ text: `${newName} added successfully`, type: 'success' });
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(error => {
          console.error('❌ Error al agregar contacto:', error.message);
          setSuccessMessage({ text: 'Failed to add contact.', type: 'error' });
          setTimeout(() => setSuccessMessage(null), 5000);
        });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (personToDelete && window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setSuccessMessage({ text: `${personToDelete.name} deleted successfully`, type: 'success' });
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(error => {
          alert(`The contact '${personToDelete.name}' was already removed from the server.`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Notification = ({ message, type }) => {
    if (!message) return null;
    return (
      <div className={type === 'success' ? 'success' : 'error'}>
        {message}
      </div>
    );
  };

  return (
    <div>
      <Notification message={successMessage?.text} type={successMessage?.type} />
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <Persons
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
