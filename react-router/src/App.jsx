import React, { useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Loging from "./components/Loging";
import { Routes, Route } from 'react-router-dom';


function App() {

    const [login,setlogin] = useState(false);
    return (<>
        <Header />


         {login ?
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>

            <Route path="/Contact" element={<Contact />}></Route>

        </Routes>  :        <Loging setlogin={setlogin}/>
}
        
        
    </>);
}


export default App;