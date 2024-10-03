import React, { memo, useContext, useEffect, useState } from "react";
import InputSearch from "../Input/InputSearch";
import SelectCategory from "../Select/SelectCategory";
import { useLocation } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { Context } from "../../context/Context";
import CartProducts from "../CartProducts/CartProducts";

const Header = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const {cartList} = useContext(Context);


  useEffect(() => {
    if (location.pathname !== "/") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [location.pathname]);

  const [showCart, setShowCart] = useState(false);
  const handleCLose = () => {
    console.log("hello");
    setShowCart(true);
  }
  return (
    <div className="flex items-center justify-between fixed w-full top-0 left-0 px-[20px] z-10 bg-white shadow-lg h-[80px]">
      <div>
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
      <div className={`py-5 space-x-5 ${!show ? "block" : "hidden"}`}>
        <InputSearch />
        <SelectCategory />
      </div>
      <button className="flex items-center justify-center p-3 bg-[#000]/30 rounded-lg relative" onClick={handleCLose}>
        <span className="text-white rounded-lg absolute top-0 right-2">{cartList.length}</span>
        <ShoppingOutlined className="text-[30px] text-white" />
      </button>
      <CartProducts showCart={showCart} setShowCart={setShowCart} />
    </div>
  );
};

export default memo(Header);
