import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Categories from '../Components/Categories';
import itemData from '../Data/ItemData';
import "../Styles/Shop.css";

export default function ShoppingPage() {

 useEffect(() => {
   setItems(itemData);
   return () => {
     setItems([]);
   }
 }, []);

 const [items, setItems] = useState<any[]>([]);
 const [refresh, setRefresh] = useState<boolean>(false);
 const [selected, setSelected] = useState<any>("All");

 const changeCategory = (): void => {
  setItems(itemData);
  const selectBox = document.getElementById("selectBox") as HTMLSelectElement;
  const selectedValue: any = selectBox.options[selectBox.selectedIndex].value;
  setSelected(selectedValue);
 }

 useEffect(() => {
   const books = itemData.filter(item => item.category === "Books");
   const clothing = itemData.filter(item => item.category === "Clothing");
   const collection = itemData.filter(item => item.category === "Collection");
   const food = itemData.filter(item => item.category === "Food");
   const miscellaneous = itemData.filter(item => item.category === "Miscellaneous");
   const trinkets = itemData.filter(item => item.category === "Trinkets");
   if (selected === "Books") setItems(books);
   if (selected === "Clothing") setItems(clothing);
   if (selected === "Collection") setItems(collection);
   if (selected === "Food") setItems(food);
   if (selected === "Miscellaneous") setItems(miscellaneous);
   if (selected === "Trinkets") setItems(trinkets);
 }, [selected]);


 useEffect(() => {
   setRefresh(!refresh);
 }, [items]);

 const [search, setSearch] = useState<string>("");

 useEffect(() => {
  if (search !== "") {
    const filteredItems = (selected === "All" ? itemData : itemData.filter(item => item.category === selected)).filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
    if (filteredItems !== []) setItems(filteredItems);
  } else {
    selected === "All" ? setItems(itemData) : setItems(itemData.filter(item => item.category === selected));
  }
 }, [search, selected]);

 const navigate = useNavigate();

 return (
  <div className='shopping-page-container'>
   <div className="item-filters">
    <input type="search" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
    <Categories changeCategory={changeCategory}/>
   </div>
   <div className="items-container">
    {items.map(item => { 
      return (
        <div key={item.id} className="item-container" onClick={() => navigate(`/${item.id}`)}>
            <img src={item.image} alt={item.title} className='item-img' />
            <div className="item-border"></div>
            <div className="item-info">
              <h4 className='item-title'>{item.title}</h4> 
              <h5 className='item-price'>${item.price}</h5>
            </div>
        </div>
      )}
    )}
   </div>
   {search !== "" && items.length === 0 &&
    <h3 className='results-msg'>No results matched.</h3>
   }
   {search !== "" && items.length > 0 &&
    <h3 className='results-msg'>Results have matched {items.length} {items.length === 1 ? "item" : "items"}.</h3>
   }
  </div>
 );
}