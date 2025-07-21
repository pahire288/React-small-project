import { useState } from "react";
import { createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword , updatePassword} from "firebase/auth";
import {auth} from "./firebase"



function Input()
{

const [email,setEmail] = useState("");
const [pass,setPass] = useState("");
const [show,setShow] = useState(false);



function send()
{
   if(!show)
   {
     createUserWithEmailAndPassword(auth , email, pass)
    
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err);
            })

            setShow(true);
   }
   else{
            signOut(auth).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })

            setShow(false);
   }
    
}


function entry()
{
 signInWithEmailAndPassword(auth, email,pass).then((res)=>{
    console.log(res);
 }).catch((err)=>{
    console.log(err)
 })
    
}


function passwor(pass)
{
    const user = auth.currentUser;


    updatePassword(user,pass).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}
    return(<>
    

<div style={{display:"flex", justifyContent:"center",alignItems:"center" , height:"100vh",margin:"0px"}}>

    <div style={{height:"400px", width:"300px" , border:"1px solid black", borderRadius:"10px",boxShadow:"0px 2px 4px rgba(0,0,0,0.2)",
        display:"flex", justifyContent:"center",alignItems:"center",margin:"0px",flexDirection:"column",gap:"50px"
    }}>
                <h1>Signup here</h1>

                <input type="text" placeholder="Email Id" style={{height:"30px",width:"250px",paddingTop:"5px"}}
                value={email}
                onChange={(e)=>{

                        setEmail(e.target.value);

                }}  />
                <input type="text" placeholder="Password" style={{height:"30px",width:"250px"}}
                
                
                value={pass}
                onChange={(e)=>{

                        setPass(e.target.value);

                }}/>

               <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"0px",flexDirection:"row" ,gap:"10px"}}>
                     <button style={{backgroundColor:"blue",color:"white",height:"40px",width:"70px",borderRadius:"5px",border:"none",cursor:"pointer"}}
                
                
                onClick={send}>{show ? "Logout" : "Signup"}</button>

                <button style={{backgroundColor:"blue",color:"white",height:"40px",width:"70px",borderRadius:"5px",border:"none",cursor:"pointer"}}
                
                
                onClick={entry}>SignIn</button>
                 <button
  style={{backgroundColor:"blue",color:"white",height:"40px",width:"70px",borderRadius:"5px",border:"none",cursor:"pointer"}}
  onClick={() => passwor(pass)}
>
  Forgate
</button>

               </div>
    </div>

</div>

    </>);
}

export default Input;