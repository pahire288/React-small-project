
import './Loging.css';
function Loging({setlogin})
{
    return(<>
    
    <div className="input">
        <input type="text" placeholder="Enter Id"/>
        <input type="text" placeholder="Enter pass"/>

        <button onClick={()=>{
            setlogin(true)
        }}>Login</button>
    </div>
    </>);
}


export default Loging;