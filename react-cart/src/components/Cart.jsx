import React from "react";


const Cart = ({CartArray}) =>{


    return(<>


    {
        CartArray.map((Item,index)=>{
           return(
            <>
<div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={index}>
            <div className="border rounded h-100 p-2 d-flex flex-column justify-content-between">
              <div className="text-center">
                <img src={Item.img} alt={Item.model} className="img-fluid product-img" />
              </div>
              <div>
                <p className="m-0 fw-bold">{Item.brand}</p>
                <p className="m-0">{Item.model}</p>
                <p className="m-0">{Item.price}</p>
                <p className="m-0 text-hiding">{Item.space}</p>
              </div>
              <button className="btn btn-primary p-1 w-100 mt-2">Buy</button>
            </div>
          </div>
            </>
           )
        })
    }
    </>);
}


export default Cart;