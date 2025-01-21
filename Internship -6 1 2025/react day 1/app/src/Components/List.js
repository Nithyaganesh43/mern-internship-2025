import React from 'react';
import './List.css'
const List = ({ prop }) => {
  return (
    <div className="list">
      <p>{prop.value}</p>
      <button onClick={() => prop.Remove(prop.key)}>X</button>
    </div>
  );
};

export default List;
