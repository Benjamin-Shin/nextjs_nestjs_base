import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Dark Switch"
      icon={
        colorMode === "dark" ? (
          <SunIcon color="black" />
        ) : (
          <MoonIcon color="black" />
        )
      }
      onClick={toggleColorMode}
      ms={{ base: 2, sm: 2, md: 2, xl: 2 }}
      mr={{ base: 2, sm: 2, md: 2, xl: 2 }}
      display="block"
      w={10}
      h={10}
    />
  );
};