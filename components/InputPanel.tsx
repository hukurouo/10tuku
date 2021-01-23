import React from "react";
import {
  Center,
  Box,
  HStack,
  Text,
  Grid,
  Radio,
  Button,
  RadioGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
} from "@chakra-ui/react";
import AccordionMenu from "./Accordion"


type inputPanelType = {
  value: string[]
  isFailure: boolean
  isSuccess: boolean
};

type inputPanelProps = {
  problemNumber: number
}

class inputPanel extends React.Component<inputPanelProps, inputPanelType> {
  constructor(props: inputPanelProps) {
    super(props);
    this.state = {
      value: ["1","*","2","+","3","/","4"],
      isFailure: false,
      isSuccess: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let updatedValue = this.state.value
    updatedValue.splice(Number(target.name), 1, target.value)
    this.setState({value: updatedValue, isFailure: false, isSuccess: false});
    event.preventDefault();
  }

  handleClick(event){
    this.setState({
      isFailure: false
    });
    event.preventDefault();
  }

  reAnswer = () => {
    this.setState({
      isSuccess: false
    });
  }

  nextProblem = () => {
    this.setState({
      value: ["5","*","5","+","3","/","8"],
      isSuccess: false
    });
  }

  handleSubmit(){
    const answer = eval(this.state.value.join(''))
    if (answer == 10){
      this.setState({
        isSuccess: true
      });
    } else {
      this.setState({
        isFailure: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.isFailure ?
          (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertDescription>
              {this.state.value.join(' ')} = <b>{orgFloor(eval(this.state.value.join('')), 10000)}</b>
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={this.handleClick}/>
          </Alert>
          ) : (
            this.state.isSuccess ? (
              <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertDescription>
              {this.state.value.join(' ')} = <b>{eval(this.state.value.join(''))}</b> 
              </AlertDescription>
            </Alert>
            ):(
              <Alert status="info" bg="gray.100" mt={4}>
                <AlertIcon />
                No.{this.props.problemNumber}
              </Alert>
            )
          )
        }
        <Center>
        <Grid templateColumns="repeat(7, 1fr)" gap={1} w={300} mt={4} mb={8}>
          {this.state.value.map((item,index)=>{
            return (
              <Center key={index}>
                <Box d="flex" mt="2" mx="auto" alignItems="center" fontSize={42}>
                  {item}
                  
                </Box>
              </Center>
            );
          })}
        </Grid>
        </Center>
        
        <form>
        <Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={1} w={300} mb={6} px={3}>
          {[1,3,5].map((item,index)=>{
            return (
              <RadioGroup defaultValue={this.state.value[item]} key={index} d="flex" mt="2" mx="auto" alignItems="center" >
                <Stack spacing={5} direction="column">
                  {['+','-','*','/'].map((operator)=>{
                    return (
                      <Radio isDisabled={this.state.isSuccess} key={operator} value={operator} name={String(item)} onChange={this.handleInputChange}>
                        <Text fontSize="3xl">
                          {operatorSvg(operator)}
                        </Text>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            );
          })}
          </Grid>
          </Center>
          <Center mt={4}>
            {this.state.isSuccess ? (
              <div>
                <Button mx={2} bg="green.100" _hover={{bg:"green.300"}} color="gray.700" onClick={this.reAnswer}>別解を探す</Button>
                <Button mx={2} bg="cyan.200" _hover={{bg:"cyan.400"}} color="gray.700" onClick={this.nextProblem}>別の問題へ</Button>
              </div>
            ):(
              <Button bg="blue.500" _hover={{bg:"blue.700"}} color="white" onClick={this.handleSubmit}>送信</Button>
            )}
          </Center>
          <AccordionMenu/>
        </form>
        
      </div>
    );
  }
}

export default inputPanel;

function operatorSvg(operator: string){
  switch (operator) {
    case '+':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    case '-':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    case '*':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    case '/':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-divide"><circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle></svg>
    default:
      return
  }
}

function orgFloor(value, base) {
  return Math.floor(value * base) / base;
}