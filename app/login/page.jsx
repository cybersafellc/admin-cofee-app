import Container from "../components/Container";
import Form from "../components/login/Form";
import { Typography } from "../components/material-components";
import Section from "../components/Section";

export default function Login() {
  return (
    <>
      <Section>
        <Container>
          <div className="flex flex-col items-center pt-2">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Admin Cofee App
            </Typography>
            <Typography className="mb-10 text-gray-600 font-normal text-[14px]">
              Enter your email and password to sign in
            </Typography>
          </div>
          <Form />
        </Container>
      </Section>
    </>
  );
}
