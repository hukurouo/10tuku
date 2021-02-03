import React from "react";
import {
  Center,
  Box,
  HStack,
  Flex,
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
  useToast,
  Progress,
  processResponsive,
} from "@chakra-ui/react";

type inputPanelProps = {
  problem: string[]
  handleInputChange: any
  TAhandleSubmit: any
  TAisFailure: boolean
  TAcount: number;
  TAtime: number
}

function TimeAttack(props: inputPanelProps){

  
    return (
      <div>
        
        {props.TAisFailure ?
          (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertDescription>
              {props.problem.join(' ')} = <b>{orgFloor(eval(props.problem.join('')), 10000)}</b>
            </AlertDescription>
            
          </Alert>
          ) : (
              <Alert status="info" bg="gray.100" mt={4}>
                <AlertIcon />
                {props.TAcount+1}問目 
              </Alert>
          )
        }
        
        <Center>
        <Grid templateColumns="repeat(7, 1fr)" gap={1} w={300} mt={4} mb={8}>
          {props.problem.map((item,index)=>{
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
              <RadioGroup defaultValue={props.problem[item] || "+"} key={index} d="flex" mt="2" mx="auto" alignItems="center" >
                <Stack spacing={5} direction="column">
                  {['+','-','*','/'].map((operator)=>{
                    return (
                      <Radio key={operator} value={operator} name={String(item)} onChange={props.handleInputChange}>
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
            
          {ToastExample(props)}
            
          </Center>
          <Progress value={props.TAtime} mt={4} max={180}/>
        </form>
      </div>
    );
  }


export default TimeAttack

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

function ToastExample(props) {
  const toast = useToast()
  return (
    <Button
      onClick={() => {
        const answer = eval(props.problem.join(''));
        if (answer == 10) {
          toast({
          position: "top",
          title: `${props.problem.join(' ')} = ${eval(props.problem.join(''))}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          });
        }
        props.TAhandleSubmit()
      }
      }
    >
      送信
    </Button>
  )
}