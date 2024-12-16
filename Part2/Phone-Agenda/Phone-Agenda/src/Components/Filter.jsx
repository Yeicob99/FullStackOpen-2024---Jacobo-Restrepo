import React from 'react';
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <h2>Filter</h2>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter names" />
    </div>
  );
};

export default Filter;