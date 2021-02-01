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
  Button,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import InputPanel from "../components/InputPanel";
import TimeAttack from "../components/TimeAttack";
import Ranking from "../components/Ranking";
import Nums from "../components/Nums";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();

type typeHomeState = {
  problemNumber: number;
  problem: string[];
  ranking: any[];
  uid: string;
  displayName: string;
  isFailure: boolean;
  TAisFailure: boolean;
  isSuccess: boolean;
  TAcount: number;
  TAnow: boolean;
};

class Home extends React.Component<{}, typeHomeState> {
  constructor(props) {
    super(props);
    this.state = {
      problemNumber: null,
      problem: [],
      ranking: [],
      uid: null,
      displayName: "",
      isFailure: false,
      isSuccess: false,
      TAisFailure: false,
      TAcount: 1,
      TAnow: false,
    };
  }
  componentDidMount() {
    this.initial();
    this.getRedirectResult();
    this.getRankingData();
  }

  initial = () => {
    const problemNum = Nums[Math.floor(Math.random() * Nums.length)];
    this.setProblem(problemNum);
  };

  getRedirectResult() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          uid: user.uid,
        });
      }
    });
  }

  getRankingData = () => {
    const Ref = db.collection("ranking");
    const rankingArray = [];
    Ref.orderBy("count", "desc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          //console.log(doc.id, " => ", doc.data());
          rankingArray.push(doc.data());
        });
        this.setState({ ranking: rankingArray });
      })
      .catch(function (error) {
        //console.log("Error getting documents: ", error);
      });
  };

  setProblem = (num: any) => {
    const strNum = String(num);
    const prev = this.state.problem;
    //console.log(prev);
    const problem =
      prev.length === 0
        ? String(num).split("").join("+").split("")
        : (
            strNum[0] +
            prev[1] +
            strNum[1] +
            prev[3] +
            strNum[2] +
            prev[5] +
            strNum[3]
          ).split("");
    this.setState({
      problemNumber: num,
      problem: problem,
      isSuccess: false,
    });
  };

  handleInputChange = (event: { target: any; preventDefault: () => void }) => {
    const target = event.target;
    let updatedValue = this.state.problem;
    updatedValue.splice(Number(target.name), 1, target.value);
    this.setState({
      problem: updatedValue,
      isFailure: false,
      TAisFailure: false,
      isSuccess: false,
    });
    event.preventDefault();
  };

  handleSubmit = () => {
    const answer = eval(this.state.problem.join(""));
    if (answer == 10) {
      this.finishedAnswer();
      this.setState({
        isSuccess: true,
      });
    } else {
      this.setState({
        isFailure: true,
      });
    }
  };

  TAhandleSubmit = () => {
    const answer = eval(this.state.problem.join(""));
    if (answer == 10) {
      this.initial();
      this.setState({
        TAcount: this.state.TAcount + 1
      });
    } else {
      this.setState({
        TAisFailure: true,
      });
    }
  }

  finishedAnswer = () => {
    if (!this.state.uid) {
      return;
    }
    const increment = firebase.firestore.FieldValue.increment(1);
    var docRef = db.collection("ranking").doc(this.state.uid);
    docRef
      .update({
        count: increment,
      })
      .then(function () {
        //console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  handleClick = () => {
    this.setState({
      isFailure: false,
    });
  };

  reAnswer = () => {
    this.setState({
      isSuccess: false,
    });
  };

  nextProblem = () => {
    this.initial();
  };

  twitterAuth = () => {
    //console.log("auth");
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //console.log(result.additionalUserInfo.username);
        var rankingRef = db.collection("ranking").doc(result.user.uid);
        rankingRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              //console.log("got document data");
            } else {
              db.collection("ranking")
                .doc(result.user.uid)
                .set({
                  count: 0,
                  screenName: result.additionalUserInfo.username,
                })
                .then(function () {
                  //console.log("Document successfully written!");
                })
                .catch(function (error) {
                  //console.error("Error writing document: ", error);
                });
            }
          })
          .catch(function (error) {
            //console.log("Error getting document:", error);
          });
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  twitterLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          displayName: "",
          uid: "",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  TAstart = () => {
    this.setState({
      TAnow: true
    })
  }

  render() {
    return (
      <Container maxW="full" minH="100vh" bg="gray.100" py={6}>
        <Head>
          <title>10をつくるやつ</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content={`https://i.imgur.com/ikWQggQl.png`}
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
                <InputPanel
                  problemNumber={this.state.problemNumber}
                  problem={this.state.problem}
                  handleInputChange={(event: {
                    target: any;
                    preventDefault: () => void;
                  }) => this.handleInputChange(event)}
                  handleSubmit={() => this.handleSubmit()}
                  nextProblem={() => this.nextProblem()}
                  reAnswer={() => this.reAnswer()}
                  handleClick={() => this.handleClick()}
                  isFailure={this.state.isFailure}
                  isSuccess={this.state.isSuccess}
                />
              </TabPanel>
              <TabPanel>
                {this.state.TAnow ? (
                  <TimeAttack
                  problemNumber={this.state.problemNumber}
                  problem={this.state.problem}
                  handleInputChange={(event: {
                    target: any;
                    preventDefault: () => void;
                  }) => this.handleInputChange(event)}
                  TAhandleSubmit={() => this.TAhandleSubmit()}
                  TAisFailure={this.state.TAisFailure}
                  TAcount={this.state.TAcount}
                />
                ):(
                  <>
                  <Button mx={2} bg="gray.200" _hover={{bg:"gray.400"}} color="gray.700" onClick={()=>this.TAstart()}>タイムアタック開始</Button>
                  </>
                )}
                
              </TabPanel>
              <TabPanel>
                <Ranking
                  name={this.state.displayName}
                  rankingData={this.state.ranking}
                  handleClickTwitterAuth={() => this.twitterAuth()}
                  handleClickTwitterLogout={() => this.twitterLogout()}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
        <Center color="black" mt={6}>
          <Stack>
            <Center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-twitter"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </Center>
            <Center>
              <Text>share</Text>
            </Center>
            <Text pt={4}>made by @hukurouo_code</Text>
          </Stack>
        </Center>
      </Container>
    );
  }
}

export default Home;
