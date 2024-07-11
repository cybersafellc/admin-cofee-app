"use client";

import React, { useRef } from "react";
import TableTransaction from "../TableTransaction";
import { Button, Card, CardBody, Input } from "../material-components";
import clientValidator from "@/utils/tokenizer/client-validator";
import { useRouter } from "next/navigation";
import { getSoldReportByDate } from "@/utils/app/sold-report/main";
import { getCookie } from "cookies-next";

export default function Main({ data }) {
  const redirect = useRouter();
  const [soldReports, setSoldReport] = React.useState(data);
  const [from, setFrom] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [buttonPrint, setButtonPrint] = React.useState(false);
  const onChangeEvent = ({ target }) => {
    if (target.name === "from") {
      setFrom(target.value);
    } else {
      setEnd(target.value);
    }
  };

  const handleGetData = async (e) => {
    e.preventDefault();
    await clientValidator(redirect);
    await getSoldReportByDate(
      getCookie("access_token"),
      { start_date: from, end_date: end },
      (err, data) => {
        if (data) {
          setSoldReport(data);
          setButtonPrint(true);
        }
      }
    );
    return;
  };
  const handlePrint = async () => {
    redirect.push(`/sold-report/print?start_date=${from}&end_date=${end}`);
  };
  return (
    <>
      <div className="ps-[20rem] py-5 grid gap-2">
        <div>
          <Card>
            <CardBody>
              <form onSubmit={handleGetData}>
                <div className="flex gap-2 flex-col max-w-[200px]">
                  <Input
                    label="From"
                    type="date"
                    onChange={onChangeEvent}
                    name="from"
                    value={from}
                  />
                  <Input
                    label="End"
                    type="date"
                    onChange={onChangeEvent}
                    name="end"
                    value={end}
                  />
                  <Button type="submit" className="max-w-[140px]">
                    Get
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-end">
          {buttonPrint ? <Button onClick={handlePrint}>Print</Button> : ""}
        </div>
        <TableTransaction data={soldReports} disable_navigation={true} />
      </div>
    </>
  );
}
