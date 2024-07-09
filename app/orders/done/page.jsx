import Container from "@/app/components/Container";
import CardOrder from "@/app/components/orders/CardOrder";
import SidebarList from "@/app/components/orders/done/SidebarList";
import Section from "@/app/components/Section";
import Sidebar from "@/app/components/Sidebar";
import { getDoneOrders } from "@/utils/app/orders/done/main";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Done() {
  const cookieStore = cookies();
  const orders = await getDoneOrders(
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
