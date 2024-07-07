"use client";
import React, { useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Card, Typography, IconButton } from "../material-components";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TABLE_HEAD = ["Order ID", "Date", "Total Amount", "Status"];

export default function TableTransaction({ data, take, skip }) {
  const redirect = useRouter();
  const [soldReportData, setSoldReportData] = useState(data);
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {soldReportData.map(({ id, order_id, date, total_amount }, index) => {
            const isLast = index === soldReportData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {`${new Date(date).getDate()}-${new Date(
                      date
                    ).getMonth()}-${new Date(date).getFullYear()}`}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <FormatRupiah value={total_amount} />
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {total_amount ? (
                      <div>
                        <i className="bx bxs-badge-check text-2xl text-green-400"></i>
                      </div>
                    ) : (
                      <div>
                        <span className="flex items-center gap-1 bg-red-100 text-red-400 justify-center rounded-2xl w-[20px] h-[20px] rounded-full ">
                          <i className="bx bx-x text-1xl"></i>
                        </span>
                      </div>
                    )}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-gray-200 flex justify-center items-center py-4">
        <div className="flex items-center gap-8">
          <a
            href={
              skip != 0
                ? "/dashboard?skip=" + (parseInt(skip) - 10) + "&take=10"
                : "/dashboard?skip=" + 0 + "&take=10"
            }
          >
            <IconButton size="sm" variant="outlined">
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </a>

          <a href={"/dashboard?skip=" + (parseInt(skip) + 10) + "&take=10"}>
            <IconButton size="sm" variant="outlined">
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </a>
        </div>
      </div>
    </Card>
  );
}
