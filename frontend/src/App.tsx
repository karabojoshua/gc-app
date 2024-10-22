import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({
    id: 0,
    username: 'unknown',
    links: ['a', 'b'],
    avatar: 'none'
  });

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())  // Parse the JSON response
      .then((data) => {
        
        console.log(data);
        setData(data[0])

      })        // Set the data in the state
      .catch((error) => console.error('Error fetching data:', error));
  }, []);  // The empty array ensures the effect runs only once when the component mounts
  
  

  return (
    <>
      <article>
        <div>
          <img src={data.avatar} className="logo" alt="Vite logo" />
        </div>
        <h1>{data.username}</h1>
        <div className="card">
          <p>{data.links[0]}</p>
          <p>{data.links[1]}</p>

      </div>
      </article>
      
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
