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
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()

type typeHomeState = {
  problemNumber: number
  problem: string[]
  answers: Map<string, string>
  isFailure: boolean
  isSuccess: boolean
}

class Home extends React.Component<{}, typeHomeState> {
  constructor(props) {
    super(props);
    this.state = {
      problemNumber: null,
      problem: [],
      answers: null,
      isFailure: false,
      isSuccess: false,
    };
  }
  componentDidMount() {
    this.initial()
  }

  initial = () => {
    let answers : Map<string, string> = new Map()
    var docRef = db.collection("testdatas").where("isAnswered" , "==", false).limit(1)
    docRef.get()
    .then((querySnapshot) => {
      console.log(querySnapshot.docs[0].id)
      const num = querySnapshot.docs[0].data().num
      this.setProblem(num)
      db.collection("testdatas").where("num" , "==", num).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          answers.set(doc.data().formula as string, doc.id as string)
        })
        this.setState({answers: answers})
      })
    }).catch((err)=>{
      console.log(err)
    });
  }

  setProblem = (num: any) => {
    const strNum = String(num)
    const prev = this.state.problem
    console.log(prev)
    const problem = (prev.length === 0) ? String(num).split("").join("+").split("") : (strNum[0] + prev[1] + strNum[1] + prev[3] + strNum[2] + prev[5] + strNum[3]).split("")
    this.setState({
      problemNumber: num,
      problem: problem,
      isSuccess: false
    })
  }

  handleInputChange = (event: { target: any; preventDefault: () => void; }) => {
    const target = event.target;
    let updatedValue = this.state.problem
    updatedValue.splice(Number(target.name), 1, target.value)
    this.setState({problem: updatedValue, isFailure: false, isSuccess: false});
    event.preventDefault();
  }

  handleSubmit = () => {
    const answer = eval(this.state.problem.join(''))
    if (answer == 10){
      const docId = this.state.answers.get(this.state.problem.join(''))
      this.finishedAnswer(docId)
      this.setState({
        isSuccess: true
      });
    } else {
      this.setState({
        isFailure: true
      });
    }
  }

  finishedAnswer= (docId: string) => {
    var docRef = db.collection("testdatas").doc(docId)
    docRef
      .update({
        isAnswered: true,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  handleClick = () => {
    this.setState({
      isFailure: false
    });
  }

  reAnswer = () => {
    this.setState({
      isSuccess: false,
    });
    /*
    db.collection("testdata2")
      .add({
        id: 10,
        formula: "1-1+1+9",
        isAnswered: false,
        num: 1119,
        operators: "-++"
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });  
    */
  }

  nextProblem = () => {
    this.initial()
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
              <InputPanel 
                problemNumber={this.state.problemNumber}
                problem={this.state.problem}
                handleInputChange={(event: { target: any; preventDefault: () => void; })=> this.handleInputChange(event)}
                handleSubmit={()=>this.handleSubmit()}
                nextProblem={()=>this.nextProblem()}
                reAnswer={()=>this.reAnswer()}
                handleClick={()=>this.handleClick()}
                isFailure={this.state.isFailure}
                isSuccess={this.state.isSuccess}
              />
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