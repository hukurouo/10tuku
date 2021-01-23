import React from "react";
import Head from "next/head";
import {
  Center,
  Container,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import InputPanel from "../components/InputPanel";
import Ranking from "../components/Ranking"
import db from '../lib/db';

type typeHomeState = {
  problemNumber: number
}

class Home extends React.Component<{}, typeHomeState> {
  constructor(props) {
    super(props);
    this.state = {
      problemNumber: 1234
    };
  }
  componentDidMount() {
    console.log(this.state.problemNumber)
    this.initial()
  }

  initial = () => {
    var docRef = db.collection("testdatas").doc("wLdmDhIl4Jb6dXEYzpWT");
    docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          this.setState({
            problemNumber: Number(doc.data().id)
          })
      } else {
          console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
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
      <Container maxW="2xl" bg="white" px={2} py="8">
        <Tabs variant="soft-rounded" colorScheme="blue" align="center">
          <TabList>
            <Tab>10つく</Tab>
            <Tab>説明</Tab>
            <Tab>ランキング</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InputPanel problemNumber={this.state.problemNumber}/>
            </TabPanel>
            <TabPanel>
              <p>統計情報</p>
            </TabPanel>
            <TabPanel>
              <Ranking/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Center color="black" mt={6}>
        <Stack>
          <Center>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </Center>
          <Center><Text>share</Text></Center>
          <Text pt={4}>made by @hukurouo_code</Text>
        </Stack>
      </Center>
    </Container>
  );
  }
}

export default Home