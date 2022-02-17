import React from 'react';

export default function Categories({ changeCategory }) {

  return (
   <div>
    <h4>Select a Category:</h4>
    <select id="selectBox" onChange={changeCategory}>
      <option defaultValue="All">All</option>
      <option value="Books">Books</option>
      <option value="Clothing">Clothing</option>
      <option value="Collection">Collection</option>
      <option value="Food">Food</option>
      <option value="Miscellaneous">Miscellaneous</option>
      <option value="Trinkets">Trinkets</option>
    </select>
   </div>
  );
}