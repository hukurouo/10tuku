import Head from "next/head";
import {
  Center,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import InputPanel from "../components/InputPanel";

export default function Home() {
  return (
    <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
      <Head>
        <title>10をつくるやつオンライン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center color="black" mb={6}>
        <Heading mt={6} pb={6} fontSize={22}>
          10をつくるやつオンライン
        </Heading>
      </Center>
      <Container maxW="2xl" bg="white" px="4" py="8">
        <Tabs variant="soft-rounded" colorScheme="blue" align="center">
          <TabList>
            <Tab>10つく</Tab>
            <Tab>説明</Tab>
            <Tab>ランキング</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InputPanel />
            </TabPanel>
            <TabPanel>
              <p>統計情報</p>
            </TabPanel>
            <TabPanel>
              <p>ランキング情報</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </Container>
    </Container>
  );
}
