import React from "react";
import productList from "./data";

const Home = ({Dispatch}) => {
  return (
    <div className="container-fluid px-5">
      <div className="row">
        {productList?.map((product, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={index}>
            <div className="border rounded h-100 p-2 d-flex flex-column justify-content-between">
              <div className="text-center">
                <img src={product.img} alt={product.model} className="img-fluid product-img" />
              </div>
              <div>
                <p className="m-0 fw-bold">{product.brand}</p>
                <p className="m-0">{product.model}</p>
                <p className="m-0">{product.price}</p>
                <p className="m-0 text-hiding">{product.space}</p>
              </div>
              <button className="btn btn-primary p-1 w-100 mt-2"
              onClick={()=>{
                Dispatch({
                    type:"Add",
                    index:index,
                })
              }}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
