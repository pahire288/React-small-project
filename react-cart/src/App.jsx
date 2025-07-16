import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";


import { useReducer } from "react";
import productList from "./components/data";



let Intialstate = {
    CartArray:[],
}

function reducer(state,action)
{
    switch(action.type)
    {
        case "Add":
            let temparray = productList[action.index];

            return{

                ...state,
                CartArray:[...state.CartArray,temparray],
            }
    }
}

const App = () => {


  const [state,Dispatch] = useReducer(reducer,Intialstate);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home Dispatch={Dispatch}/>} />
        <Route path="/cart" element={<Cart CartArray={state.CartArray}/>} />
      </Routes>
    </>
  );
};

export default App;
