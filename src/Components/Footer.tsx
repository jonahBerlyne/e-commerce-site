import React from 'react';
import "../Styles/App.css";
import Audio from './Audio';

export default function Footer() {
  return (
    <footer className="text-center footer">
      <div className="text-center p-3" style={{ backgroundColor: "#07f3a43c" }}>
       <Audio />
      </div>
    </footer>
  );
}