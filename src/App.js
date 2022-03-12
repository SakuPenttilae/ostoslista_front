import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
const URL = "http://localhost/ostoslista/"

function App() {
  const [items, setItems] = useState([])
  const [item, setItem] = useState("")
  const [amount, setAmount] = useState()

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      }) 
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item, amount:amount})
    axios.post(URL+"add.php", json, {
      headers: {
        "Content-Type" : "application/json"
      }
    }) .then((response) => {
      setItems(items => [...items, response.data])
      setItem("")
      setAmount("")
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL+"delete.php", json, {
      headers: {
        "Content-Type" : "application/json"
      }
    }) .then((response) => {
      const newList = items.filter((item) => item.id !== id);
      setItems(newList)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }


  return (
    <div>
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New Item </label>
        <input value={item} placeholder='Type of grocery' onChange={e => setItem(e.target.value)}/>
        <input value={amount} type="number" placeholder='Amount' onChange={e => setAmount(e.target.value)}/>
        <button>save</button>
      </form>
      <ul className="no-bullets">
        {items?.map(item => (
          <li key={item.id}>
            {item.description}
            &nbsp;
            {item.amount}
            &nbsp;
            <a href="#" onClick={() => remove(item.id)}>
              Delete
            </a>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
