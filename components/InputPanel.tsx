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

type inputPanelType = {
  value: string[]
  isFailure: boolean
  isSuccess: boolean
};

class inputPanel extends React.Component<{}, inputPanelType> {
  constructor(props: {} | Readonly<{}>) {
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

  handleInputChange(event: { target: any; }) {
    const target = event.target;
    let updatedValue = this.state.value
    updatedValue.splice(Number(target.name), 1, target.value)
    this.setState({value: updatedValue});
  }

  handleSubmit(event: { preventDefault: () => void; }) {
    console.log(this.state.value)
    event.preventDefault();
  }

  handleClick(event){
    this.setState({
      isFailure: false
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {this.state.isFailure &&
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              1*2+3/4 = 2.75
            </AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={this.handleClick}/>
          </Alert>
        }
        {this.state.isSuccess &&
          <Alert status="success">
            <AlertIcon />
            <AlertDescription>
              1+2+3+4 =10　(No.1234)
            </AlertDescription>
          </Alert>
        }
        <Center>
        <Grid templateColumns="repeat(7, 1fr)" gap={1} w={300} mt={4} mb={8}>
          {this.state.value.map((item,index)=>{
            return (
              <div key={index}>
                <Box d="flex" mt="2" mx="auto" alignItems="center" fontSize={42}>
                  {item}
                </Box>
              </div>
            );
          })}
        </Grid>
        </Center>
        
        <form onSubmit={this.handleSubmit}>
        <Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={1} w={300} mb={12} px={3}>
          {[1,3,5].map((item,index)=>{
            return (
              <RadioGroup defaultValue={this.state.value[item]} key={index} d="flex" mt="2" mx="auto" alignItems="center" >
                <Stack spacing={5} direction="column">
                  {['+','-','*','/'].map((operator)=>{
                    return (
                      <Radio key={operator} value={operator} name={String(item)} onChange={this.handleInputChange}>
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
          <Center>
            <Button type="submit" value="Submit" bg="blue.500" color="white">送信</Button>
          </Center>
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