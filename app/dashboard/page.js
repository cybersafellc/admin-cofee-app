import { notFound } from "next/navigation";
import Container from "../components/Container";
import CardProfit from "../components/dashboard/CardProfit";
import SidebarList from "../components/dashboard/SidebarList";
import TableTransaction from "../components/dashboard/TableTransaction";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import {
  getProfit,
  getSold,
  getSoldReportData,
} from "@/utils/app/dashboard/main";
import { cookies } from "next/headers";

export default async function Dashboard({ searchParams }) {
  const cookieStore = cookies();
  const dataProfit = await getProfit(
    cookieStore.get("access_token")?.value,
    (err, data) => {
      return data;
    }
  );
  const dataSold = await getSold(
    cookieStore.get("access_token")?.value,
    (err, data) => {
      return data;
    }
  );
  const getSoldReportDatas = await getSoldReportData(
    cookieStore.get("access_token")?.value,
    searchParams,
    (err, data) => {
      return data;
    }
  );
  console.log(getSoldReportDatas);
  if (!dataProfit || !dataSold || !getSoldReportDatas) return notFound();
  return (
    <>
      <Section className="py-5">
        <Container>
          <Sidebar>
            <SidebarList />
          </Sidebar>
          <div className="ps-[20rem] grid grid-cols-1 lg:grid-cols-2 gap-2 mb-10">
            <CardProfit
              profit={dataProfit.total_amount}
              sold={dataSold.total_order}
            />
          </div>
          <div className="ps-[20rem]">
            <TableTransaction
              data={getSoldReportDatas}
              take={searchParams.take || 10}
              skip={searchParams.skip || 0}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
