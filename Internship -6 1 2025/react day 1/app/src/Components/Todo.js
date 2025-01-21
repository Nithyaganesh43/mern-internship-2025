import List from './List';
import { useState } from 'react';
import './Todo.css';
const Todo = () => {
  const [todoList, settodoList] = useState({});
  const [taskIndex, settaskIndex] = useState(0);

  const Remove = (ind) => {
    let temp = { ...todoList };
    delete temp[ind];
    settodoList(temp);
  };
  const Add = () => {
    let val = document.getElementById('Entered').value.trim();
    if(val){
      
      settodoList({ ...todoList, [taskIndex]: val });
      settaskIndex(taskIndex + 1);
    }
    document.getElementById('Entered').value = '';
  }; 
  return (
    <div className='Container'>
      <h1>1+1 Do List</h1>
      <div className={'Bar'}>
        <input id="Entered" placeholder={'Enter Task'}></input>
        <button onClick={Add}>Add</button>
      </div>
      <div className="ListItems">
        {Object.entries(todoList).map(([key, value]) => (
          <List key={key} prop={{key,value,Remove}} />
        ))}
      </div>
    </div>
  );
};
export default Todo;
