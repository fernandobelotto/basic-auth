import { Center, VStack } from "@chakra-ui/react";
import AppForm from "../components/AppForm";

export const Home = () => {
  return (
    <Center h="100vh">
      <VStack>
        <AppForm />
      </VStack>
    </Center>
  );
};
