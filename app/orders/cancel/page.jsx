import Container from "@/app/components/Container";
import SidebarList from "@/app/components/orders/cancel/SidebarList";
import CardOrder from "@/app/components/orders/CardOrder";
import Section from "@/app/components/Section";
import Sidebar from "@/app/components/Sidebar";
import { getCancelOrder } from "@/utils/app/orders/cancel/main";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Cancel() {
  const cookieStore = cookies();
  const orders = await getCancelOrder(
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
