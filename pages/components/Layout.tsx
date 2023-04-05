import React from "react";
import Footer from "@/pages/components/Footer";
import { Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <Container maxW="container.xl" p={0}>
      {props.children}
      <Footer />
    </Container>
  );
}