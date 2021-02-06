import { useState, useEffect } from 'react'
import {
  Center,
  Text,
  Grid,
  Radio,
  Button,
  RadioGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  Stack,
  useToast,
  Progress
} from '@chakra-ui/react'
import { PloblemDisplay } from './ProblemDisplay'
import { operatorSvg, Floor } from '../lib/Common'
import Nums from './Nums'

type inputPanelProps = {
  time: number
}

function TimeAttack({ time }: inputPanelProps) {
  const [problem, setProblem] = useState(initialProblemDisplay)
  const [count, setCount] = useState(0)
  const [isFailure, setIsFailure] = useState(false)
  const toast = useToast()

  function initialProblemDisplay() {
    const problemNum = Nums[Math.floor(Math.random() * Nums.length)]
    const strNum = String(problemNum)
    const prev = problem || []
    const problemDisplay: string[] =
      prev.length === 0
        ? String(problemNum).split('').join('+').split('')
        : (strNum[0] + prev[1] + strNum[1] + prev[3] + strNum[2] + prev[5] + strNum[3]).split('')
    return problemDisplay
  }

  return (
    <div>
      {isFailure ? (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <AlertDescription>
            {problem.join(' ')} = <b>{Floor(eval(problem.join('')), 1000)}</b>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert status="info" bg="gray.100" mt={4}>
          <AlertIcon />
          {count + 1}問目
        </Alert>
      )}
      <PloblemDisplay problem={problem} />
      <form>
        <Center>
          <Grid templateColumns="repeat(3, 1fr)" gap={1} w={300} mb={6} px={3}>
            {[1, 3, 5].map((item, index) => {
              return (
                <RadioGroup
                  defaultValue={problem[item] || '+'}
                  key={index}
                  d="flex"
                  mt="2"
                  mx="auto"
                  alignItems="center"
                >
                  <Stack spacing={5} direction="column">
                    {['+', '-', '*', '/'].map((operator) => {
                      return (
                        <Radio
                          key={operator}
                          value={operator}
                          name={String(item)}
                          onChange={(event) => {
                            const target = event.target
                            problem.splice(Number(target.name), 1, target.value)
                            setProblem(problem.join('').split(''))
                            setIsFailure(false)
                          }}
                        >
                          <Text fontSize="3xl">{operatorSvg(operator)}</Text>
                        </Radio>
                      )
                    })}
                  </Stack>
                </RadioGroup>
              )
            })}
          </Grid>
        </Center>
        <Center mt={4}>
          <Button
            onClick={() => {
              const answer = eval(problem.join(''))
              if (answer == 10) {
                toast({
                  position: 'top',
                  title: `${problem.join(' ')} = ${eval(problem.join(''))}`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true
                })
                setProblem(initialProblemDisplay)
                setCount(count + 1)
              } else {
                setIsFailure(true)
              }
            }}
          >
            送信
          </Button>
        </Center>
        <Progress value={time} mt={4} max={180} />
      </form>
    </div>
  )
}

export default TimeAttack
