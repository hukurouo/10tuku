import React from "react";
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
import TimeAttackMenu from "../components/TimeAttackMenu";
import Ranking from "../components/Ranking";
import Footer from "../components/Footer"
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

type typeHomeState = {
  ranking: any[];
  isRequireReload: boolean;
};

class Home extends React.Component<{}, typeHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ranking: [],
      isRequireReload: true
    };
  }
  componentDidMount() {
    this.getRankingData();
  }

  getRankingData = () => {
    const Ref = db.collection("TimeAttackRanking");
    const rankingArray = [];
    Ref.orderBy("count", "desc")
      .limit(20)
      .get({ source: "cache" })
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          rankingArray.push(doc.data());
        });
        this.setState({ ranking: rankingArray });
      })
      .catch(function (error) {
        //console.log(error)
      });
  };

  reloadRankingData = () => {
    console.log("relaod");
    const Ref = db.collection("TimeAttackRanking");
    const rankingArray = [];
    Ref.orderBy("count", "desc")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          rankingArray.push(doc.data());
        });
        this.setState({ ranking: rankingArray, isRequireReload: false });
      });
  };

  render() {
    return (
      <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
        <Head>
          <title>10をつくるやつ</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content={`https://i.imgur.com/I25KZX7l.png`}
          />
          <meta name="og:title" content={"10をつくるやつ"} />
          <meta name="twitter:card" content="summary" />
        </Head>

        <Center color="black" mb={6}>
          <Heading mt={6} pb={6} fontSize={22}>
            10をつくるやつ
          </Heading>
        </Center>
        <Container maxW="2xl" bg="white" px={2} py="8">
          <Tabs colorScheme="blue" align="center">
            <TabList>
              <Tab p={2} fontWeight="bold" color="gray.600">
                10つく
              </Tab>
              <Tab p={2} fontWeight="bold" color="gray.600">
                タイムアタック
              </Tab>
              <Tab p={2} fontWeight="bold" color="gray.600">
                ランキング
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <InputPanel/>
              </TabPanel>
              <TabPanel align="left">
                <TimeAttackMenu/>
              </TabPanel>
              <TabPanel>
                <Ranking
                  rankingData={this.state.ranking}
                  reload={() => this.reloadRankingData()}
                  reloadFlag={this.state.isRequireReload}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      <Footer/>
      </Container>
    );
  }
}

export default Home;
