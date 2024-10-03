import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { CloseOutlined } from "@ant-design/icons";

const CartProducts = ({ showCart, setShowCart }) => {
  const { cartList, setCartList } = useContext(Context);

  const handleDeleteProduct = (id) => {
    setCartList(cartList.filter((item) => item.id !== id));
  };
  const handleDeleteAllProduct = () => {
    setCartList([]);
  }

  return (
    <div
      className={`fixed top-0 ${
        !showCart ? "-right-[100%]" : "right-0"
      } w-[400px] h-screen bg-gray-600 duration-300`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center w-full mb-4">
          <h2 className="text-2xl text-white font-bold">Your Cart</h2>
          <button
            className="text-white flex items-center justify-center"
            onClick={() => setShowCart(!showCart)}
          >
            <CloseOutlined className="text-[20px]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-scroll cart">
          {cartList.length > 0 ? (
            cartList.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-start w-full gap-5 mb-5"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-[120px] h-[120px] rounded-lg object-cover"
                  width={120}
                  height={120}
                />
                <div className="w-full">
                  <h3 className="text-md text-white font-bold">{item.title}</h3>
                  <div className="flex justify-between w-full mt-5">
                    <div>
                      <p className="text-md text-white">Price: ${item.price}</p>
                      <p className="text-md text-white">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="text-white hover:bg-[#fff]/30 font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-md text-white text-center">Your cart is empty</p>
          )}
        </div>
        {cartList.length > 0 ? (
          <button onClick={handleDeleteAllProduct} className="text-white py-2 hover:bg-[#fff]/30 rounded-lg mt-5">
            Clear all
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CartProducts;
