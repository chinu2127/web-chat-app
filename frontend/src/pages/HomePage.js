import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const HomePage = (e) => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent="center"
        padding={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        bg="white"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        p={4}
        bg="white"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
