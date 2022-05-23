import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import itemData from '../Data/ItemData';
import "../Styles/Shop.css";
import { Search } from "@mui/icons-material";
import AddToCart from "../Components/AddToCart";

export default function ShoppingPage() {

 useEffect(() => {
   setItems(itemData);
   return () => {
     setItems([]);
   }
 }, []);

 const [items, setItems] = useState<any[]>([]);
 const [refresh, setRefresh] = useState<boolean>(false);

 useEffect(() => {
   setRefresh(!refresh);
 }, [items]);

 const [search, setSearch] = useState<string>("");

 useEffect(() => {
  if (search !== "") {
    const filteredItems = itemData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
    if (filteredItems !== []) setItems(filteredItems);
  } else {
    setItems(itemData);
  }
 }, [search]);

 const navigate = useNavigate();

 return (
  <div className='shopping-page-container'>
    <div className="search-input-container">
      <Search />
      <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
    </div>
    {search !== "" && items.length === 0 &&
      <h3 className='results-msg'>No results matched.</h3>
    }
    {search !== "" && items.length > 0 &&
      <h3 className='results-msg'>Results have matched {items.length} {items.length === 1 ? "item" : "items"}.</h3>
    }
    <div className={`items-container ${(items.length === 1 || items.length === 2) && "one-or-two-items"}`}>
      {items.map(item => { 
        return (
          <div key={item.id} className="item-container">
              <img src={item.image} alt={item.title} className='item-img' />
              <div className="item">
                <h4 className='item-title'>{item.title}</h4> 
                <h5 className='item-price'>${item.price}</h5>
                <AddToCart id={item.id} />
              </div>
          </div>
        )}
      )}
    </div>
  </div>
 );
}