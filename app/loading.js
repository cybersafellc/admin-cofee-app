import Container from "./components/Container";
import Section from "./components/Section";

export default function loading() {
  return (
    <>
      <Section className="flex justify-center items-center">
        <Container className="flex justify-center items-center text-1xl gap-1">
          <i className="bx bxs-coffee-bean"></i> loading...
        </Container>
      </Section>
    </>
  );
}
