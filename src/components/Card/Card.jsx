import React, { memo, useContext, useEffect } from "react";

import "./card.css";
import { MoreOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Card = ({ item }) => {
  const { cartList, setCartList } = useContext(Context);

  const handleAddCart = () => {
    const exist = cartList.find((x) => x.id === item.id);
  
    if (!exist) {
      setCartList([...cartList, { ...item, inCart: true, quantity: 1 }]);
    } else {
      const updatedCart = cartList.map((x) =>
        x.id === item.id ? { ...x, inCart: !x.inCart } : x
      );
      setCartList(updatedCart.filter((x) => x.inCart !== false));
    }
  };
  

  return (
    <div className="card flex flex-col justify-between">
      <div>
        <div className="card-img">
          <img
            className="h-[250px] rounded-lg object-cover"
            src={item.images[0]}
            alt={item.title}
            width={"100%"}
            height={250}
          />
        </div>
        <div className="card-title">{item.title}</div>
        <div className="card-subtitle line-clamp-5">{item.description}</div>
      </div>
      <div className="card-footer flex flex-col">
        <hr className="card-divider" />
        <div className="flex items-center justify-between mt-5">
          <div className="card-price">
            <span>$</span> {item.price}
          </div>
          <Link to={`${item.id}`}>
            <MoreOutlined className="rotate-90 text-[30px] cursor-pointer" />
          </Link>
          <button className="card-btn" onClick={handleAddCart}>
            <ShoppingCartOutlined className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
