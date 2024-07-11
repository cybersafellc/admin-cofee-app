import { cookies } from "next/headers";
import Container from "../components/Container";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import SidebarList from "../components/sold-report/SidebarList";
import { getSoldReportData } from "@/utils/app/sold-report/main";
import { notFound } from "next/navigation";
import TableTransaction from "../components/TableTransaction";
import Main from "../components/sold-report/Main";

export default async function SoldReport({ searchParams }) {
  console.log(searchParams);
  const cookieStore = cookies();
  const soldReports = await getSoldReportData(
    cookieStore.get("access_token")?.value,
    searchParams,
    (err, data) => {
      return data;
    }
  );
  if (!soldReports) return notFound();
  return (
    <>
      <Section>
        <Container>
          <Sidebar>
            <SidebarList />
          </Sidebar>
          <Main data={soldReports} />
        </Container>
      </Section>
    </>
  );
}
