import SidebarList from "@/app/components/orders/pending/SidebarList";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import CardOrder from "@/app/components/orders/CardOrder";
import { getPendingOrders } from "@/utils/app/orders/pending/main";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Pending() {
  const cookieStore = cookies();
  const orders = await getPendingOrders(
    cookieStore.get("access_token")?.value,
    (err, data) => {
      return data;
    }
  );
  if (!orders) return notFound();
  console.log(orders);
  return (
    <>
      <Section className="py-5">
        <Container>
          <Sidebar>
            <SidebarList />
          </Sidebar>
          <div className="ps-[20rem] grid gap-2">
            {orders.map((order, index) =>
              order.product_details ? (
                <div key={index + 1}>
                  <CardOrder order={order} />
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
