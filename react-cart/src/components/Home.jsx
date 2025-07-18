import React, { useState } from "react";
import productList from "./data";

const Home = ({ Dispatch }) => {
  const [cartItem, setCartItem] = useState(null);
  const [show, setShow] = useState(false);

  function handleImageClick(index) {
    const selectedProduct = productList[index];
    console.log("Clicked product:", selectedProduct);
    setCartItem(selectedProduct);
    setShow(true); // Always show on click
  }

  return (
    <div className="container-fluid px-5">
      <div className="row">
        {productList.map((product, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={index}>
            <div className="border rounded h-100 p-2 d-flex flex-column justify-content-between">
              <div className="text-center">
                <img
                  src={product.img}
                  alt={product.model}
                  className="img-fluid product-img"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImageClick(index)}
                />
              </div>
              <div>
                <p className="m-0 fw-bold">{product.brand}</p>
                <p className="m-0">{product.model}</p>
                <p className="m-0">{product.price}</p>
                <p className="m-0 text-hiding">{product.space}</p>
              </div>
              <button
                className="btn btn-primary p-1 w-100 mt-2"
                onClick={() =>
                  Dispatch({
                    type: "Add",
                    index: index,
                  })
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {show && cartItem && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="border rounded p-3">
              <div className="text-center">
                <img
                  src={cartItem.img}
                  alt={cartItem.model}
                  className="img-fluid product-img"
                />
              </div>
              <div className="mt-2">
                <p className="m-0 fw-bold">{cartItem.brand}</p>
                <p className="m-0">{cartItem.model}</p>
                <p className="m-0">{cartItem.price}</p>
                <p className="m-0">{cartItem.space}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
