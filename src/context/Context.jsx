import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useDebounce from "../hook/useDebounce";

export const Context = createContext();

export const ProductContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categoryAll, setCategoryAll] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const searchResult = useDebounce(search, 500, setIsLoading);
  
  const getData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?title=${searchResult}&offset=${pagination}&limit=12`,
        {
          params: {
            categoryId: categoryId,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
        setIsLoading(false)
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
        setCategoryAll(
          response.data.map((category) => {
            return { value: category.id, label: category.name };
          })
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);
  

  useEffect(() => {
    getData();
  }, [searchResult, categoryId, pagination]);

  return (
    <Context.Provider
      value={{
        products,
        search,
        setSearch,
        isLoading,
        setIsLoading,
        categoryAll,
        categoryId,
        setCategoryId,
        pagination,
        setPagination,
        pageNumber,
        setPageNumber,
        cartList,
        setCartList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
