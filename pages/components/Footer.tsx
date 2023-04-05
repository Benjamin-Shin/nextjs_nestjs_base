import React from "react";
import {
  Flex,
  Stack,
  Text,
  VStack,
  Divider,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { FaGitlab, FaGithub } from "react-icons/fa";
import Link from "next/link";

interface MenuItemProps {
  m: React.ReactNode;
  children: string;
  to: string;
}
const MenuItem = ({ children, to = "/" }: MenuItemProps) => {
  return (
    <Text
      ms={{ base: 2, sm: 2, md: 2, xl: 2 }}
      mr={{ base: 2, sm: 2, md: 2, xl: 2 }}
      display="block"
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

const Footer = () => {
  return (
    <VStack direction={["column", "column", "column", "column"]}>
      <Divider />
      <Flex px={{ base: "4", md: "8" }} py="4" as="footer" wrap="wrap" w="100%" mx="auto">
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
          w="100%"
        >
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton
              as="a"
              href="https://github.com/Benjamin-Shin/nextjs_nestjs_base"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub fontSize="20px" />}
            />
            {/* <IconButton
              as="a"
              href="https://192.168.122.88/tphc/commonlib/next.js-and-nest.js"
              target="_blank"
              aria-label="Gitlab"
              icon={<FaGitlab fontSize="20px" />}
            /> */}
          </ButtonGroup>
        </Stack>
      </Flex>
      <MenuItem m={4} to="/">
        &copy; Enjoydev.NET. All rights reserved.
      </MenuItem>
    </VStack>
  );
};

export default Footer;