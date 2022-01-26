import React from 'react';

export default function Categories( {onChange} ) {

  return (
   <div>
    <h4>Select a Category:</h4>
    <select id="selectBox" onChange={onChange}>
      <option defaultValue="All">All</option>
      <option value="Electronics">Electronics</option>
      <option value="Jewelry">Jewelry</option>
      <option value="Men's Clothing">Men's Clothing</option>
      <option value="Women's Clothing">Women's Clothing</option>
    </select>
   </div>
  );
}