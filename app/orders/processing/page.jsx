import Container from "@/app/components/Container";
import Main from "@/app/components/orders/processing/Main";
import SidebarList from "@/app/components/orders/processing/SidebarList";
import Section from "@/app/components/Section";
import Sidebar from "@/app/components/Sidebar";
import { getOrders } from "@/utils/app/orders/processing/main";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Processing() {
  const cookieStore = cookies();
  const orders = await getOrders(
    cookieStore.get("access_token")?.value,
    (err, data) => {
      return data;
    }
  );
  if (!orders) return notFound();
  return (
    <>
      <Section className="py-5">
        <Container>
          <Sidebar>
            <SidebarList />
          </Sidebar>
          <Main data={orders} />
        </Container>
      </Section>
    </>
  );
}
