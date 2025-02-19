import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
    .then(response => response.data);
};

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        return Promise.reject(error);
      }
      return Promise.reject(new Error('An error occurred while updating the contact'));
    });
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
      return Promise.reject(new Error('Failed to delete the contact.'));
    });
};

export default { getAll, create, update, remove };
