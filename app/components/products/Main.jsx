"use client";

import React from "react";
import CardProducts from "./CardProducts";
import { Input } from "../material-components";
import { searchProducts } from "@/utils/app/products/main";
import AddProducts from "./AddProducts";

export default function Main({ products }) {
  const [dataProducts, setDataProducts] = React.useState(products);
  const onSearch = async ({ target }) => {
    await searchProducts(target.value, (err, products) => {
      setDataProducts(products);
    });
  };
  return (
    <>
      <div className="ps-[20rem] mb-10 py-5">
        <div className="w-full">
          <Input
            label="Search"
            onChange={onSearch}
            icon={<i className="bx bx-search"></i>}
          />
        </div>
      </div>

      <div className="ps-[20rem] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <AddProducts />
        {dataProducts.map((product, index) => (
          <div key={index + 1}>
            <CardProducts {...product} />
          </div>
        ))}
      </div>
    </>
  );
}
