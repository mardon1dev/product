import { Input } from "antd";
import React, { memo, useContext } from "react";
import { Context } from "../../context/Context";

const InputSearch = () => {
  const {search, setSearch} = useContext(Context)
  return (
    <Input
      allowClear
      value={search}
      onChange={(e)=>setSearch(e.target.value.trim())}
      placeholder="Search..."
      type="text"
      className="w-[300px]"
      size="large"
    />
  );
};

export default memo(InputSearch);
