import { useEffect, useState } from 'react'
import './App.css'
import { fet } from './components/Fetch'

function App() {

  const [data, setData] = useState(null);
  const [load, setLoad] = useState("Loading..."); // ✅ Initialize here

  useEffect(() => {
    fet().then((res) => {
      setData([...res,{userId:321,id:452,title:"Demo",body:"pratik ahire"}]);
      setLoad(null); // ✅ Remove loading once data is fetched
    });
  }, []);


  console.log(data);


function deletefun(index)
{
  // let target = data[index];

  let newarray = data.filter((item,ign)=> ign !== index);

  setData(newarray);
}

  return (
    <>
      <div className="cards">
        {data ? data.map((Item, index) => {
          return (
            <div className='card' key={index}>
              <h1>{Item.id}</h1>
              <h1>{Item.title}</h1>
              <p>{Item.body}</p>
              <button onClick={()=>{
                deletefun(index)
              }}>delete</button>

            </div>
          );
        }) : <h1>{load}</h1>
        
        }
      </div>
    </>
  )
}

export default App
