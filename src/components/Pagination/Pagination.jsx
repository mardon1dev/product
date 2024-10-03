import React, { memo, useContext } from "react";
import { Pagination } from "antd";
import { Context } from "../../context/Context";

const PaginationSection = () => {
    const {setPagination, pagination, pageNumber, setPageNumber} = useContext(Context)
    const handlePageChange = (page) => {
        if (page > pageNumber) {
            setPagination(pagination + 12);
        }
        if (page < pageNumber) {
            setPagination(pagination - 12);
        }
        setPageNumber(page)
    }
  return (
    <div className="mt-5 py-5 mx-auto w-full flex justify-between">
      <div className="flex justify-between w-full">
        <Pagination
          current={pageNumber}
          total={50}
          onChange={handlePageChange}          
          className="w-full flex justify-center"
        />
      </div>
    </div>
  );
};

export default memo(PaginationSection);
