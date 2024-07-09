import Container from "./components/Container";
import { Button } from "./components/material-components";
import Section from "./components/Section";

export default function Home() {
  return (
    <Section>
      <Container>
        <Button>
          Hello<i class="bx bxs-coffee-bean"></i>
        </Button>
      </Container>
    </Section>
  );
}
