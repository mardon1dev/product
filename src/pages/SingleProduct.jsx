import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Loading from "../components/Loading/Loading";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cartList, setCartList } = useContext(Context);

  const [singleProduct, setSingleProduct] = useState(null); // Start with null
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0); // Default quantity is 0

  // Function to get product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        const productData = response.data;

        // Check if the product exists in the cart
        const productInCart = cartList.find((product) => product.id === productData.id);
        if (productInCart) {
          setQuantity(productInCart.quantity); // Sync quantity if product is in cart
        }

        setSingleProduct(productData); // Set API data
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, cartList]); // Re-run if `id` or `cartList` changes

  // Handle adding or updating cart
  const handleAddToCart = () => {
    if (quantity === 0) {
      // Remove from cart if quantity is 0
      setCartList(cartList.filter((product) => product.id !== singleProduct.id));
    } else {
      const updatedCart = cartList.find((product) => product.id === singleProduct.id)
        ? cartList.map((product) =>
            product.id === singleProduct.id
              ? { ...product, quantity }
              : product
          )
        : [...cartList, { ...singleProduct, quantity }];
      
      setCartList(updatedCart);
    }
  };

  // Calculate discount based on price
  const discount = singleProduct?.price > 50 ? singleProduct?.price * 2 : singleProduct?.price * 1.5;

  if (loading || !singleProduct) {
    return (
      <div className="w-full flex justify-center mx-auto items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto pt-[100px]">
      <button className="text-[20px]" onClick={() => navigate(-1)}>Back</button>

      <div className="mt-5 flex items-start gap-10 justify-between">
        <div className="flex flex-col flex-1 w-full">
          <div className="overflow-hidden rounded-lg">
            <img
              className="w-full h-[350px] object-cover rounded-lg hover:scale-110 duration-200 cursor-pointer"
              src={singleProduct?.images[0]}
              alt={singleProduct.title}
              width={375}
              height={350}
            />
          </div>
          <div className="flex items-center mt-5 w-full justify-between gap-5">
            <div className="overflow-hidden rounded-lg flex-1">
              <img
                className="w-full h-[100px] object-cover rounded-lg hover:scale-110 duration-200 cursor-pointer"
                src={singleProduct?.images[1]}
                alt={singleProduct.title}
                width={90}
                height={100}
              />
            </div>
            <div className="overflow-hidden rounded-lg flex-1">
              <img
                className="w-full h-[100px] object-cover rounded-lg hover:scale-110 duration-200 cursor-pointer"
                src={singleProduct?.images[2]}
                alt={singleProduct.title}
                width={90}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold">{singleProduct.title}</h2>
          <p className="mt-5">{singleProduct.description}</p>
          <div className="mt-5 flex items-center space-x-5">
            <div className="w-[60px] h-[60px] border-[1px] border-[#000] rounded-lg bg-[#000]/20 flex items-center justify-center">
              <p className="text-2xl font-bold">${singleProduct.price}</p>
            </div>
            <div>
              <p className="text-blue-600 font-bold">
                Save {(discount / singleProduct.price) * 10}%
              </p>
              <p>Special offer for you. It is your chance.</p>
            </div>
          </div>

          <div className="mt-5 flex items-center space-x-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(quantity <= 0 ? 0 : quantity - 1)}
                className="text-[20px] w-[40px] active:bg-[#000]/30 h-[50px] flex items-center justify-center border-[1px] border-[#000] rounded-lg"
              >
                <CaretLeftOutlined />
              </button>
              <span className="font-bold text-[20px] w-[40px] h-[50px] flex items-center justify-center border-[1px] border-[#000] rounded-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[20px] w-[40px] active:bg-[#000]/30 h-[50px] flex items-center justify-center border-[1px] border-[#000] rounded-lg"
              >
                <CaretRightOutlined />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="text-white bg-[#000]/30 h-[50px] w-[150px] rounded-lg active:bg-[#000]/70"
            >
              <ShoppingCartOutlined className="text-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
