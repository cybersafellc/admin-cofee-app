"use client";

import React, { useEffect } from "react";
import CardOrder from "../CardOrder";
import clientValidator from "@/utils/tokenizer/client-validator";
import { useRouter } from "next/navigation";
import { getOrders } from "@/utils/app/orders/processing/main";
import { getCookie } from "cookies-next";

export default function Main({ data }) {
  const redirect = useRouter();
  const [orders, setOrders] = React.useState(data);
  const getData = async () => {
    for (let i = 0; i < 2; i) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await clientValidator(redirect);
      await getOrders(getCookie("access_token"), (err, datas) => {
        setOrders(datas);
      });
      console.log("fetch");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="ps-[20rem] grid gap-2">
      {orders.map((order, index) => {
        return order.product_details ? (
          <div key={index + 1}>
            <CardOrder order={order} />
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}
