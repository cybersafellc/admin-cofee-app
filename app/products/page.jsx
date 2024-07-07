import { getProducts } from "@/utils/app/products/main";
import Container from "../components/Container";
import Main from "../components/products/Main";
import SidebarList from "../components/products/SidebarList";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import { notFound } from "next/navigation";

export default async function Products() {
  const products = await getProducts((err, data) => {
    return data;
  });
  if (!products) return notFound();
  return (
    <>
      <Section>
        <Container>
          <Sidebar>
            <SidebarList />
          </Sidebar>
          <Main products={products} />
        </Container>
      </Section>
    </>
  );
}
