import React, { useContext } from "react";
import Card from "../components/Card/Card";
import { Context } from "../context/Context";
import Loading from "../components/Loading/Loading";
import NoData from "../components/NoData/NoData";
import PaginationSection from "../components/Pagination/Pagination";

const Home = () => {
  const { products, isLoading } = useContext(Context);

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-between pt-[100px]">
        {isLoading ? (
          <div className="w-full mt-[100px] mx-auto flex items-center justify-center">
            <Loading />
          </div>
        ) : products.length > 0 ? (
          products.map((item, index) => <Card item={item} key={index} />)
        ) : (
            <div className="w-full mt-[100px] mx-auto flex items-center justify-center">
            <NoData />
          </div>
        )}
      </div>
      {
        products.length > 0 && !isLoading ? (<PaginationSection />) : ("")
      }
    </div>
  );
};

export default Home;
