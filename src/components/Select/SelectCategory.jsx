import React, { memo, useContext } from "react";
import { Select } from "antd";
import { Context } from "../../context/Context";

const SelectCategory = () => {
  const { categoryAll, setCategoryId } = useContext(Context);

  const onChange = (value) => {
    setCategoryId(value);
  };

  return (
    <Select
      showSearch
      allowClear
      placeholder="Choose category"
      optionFilterProp="label"
      size="large"
      className="w-[300px]"
      onChange={onChange}
      options={categoryAll}
    />
  );
};
export default memo(SelectCategory);
