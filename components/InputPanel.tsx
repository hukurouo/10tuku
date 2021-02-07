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
  CloseButton,
  Stack
} from '@chakra-ui/react'
import { PloblemDisplay } from './ProblemDisplay'
import { operatorSvg, Floor } from '../lib/Common'
import Nums from './Nums'

function inputPanel() {
  const [problem, setProblem] = useState(initialProblemDisplay)
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function initialProblemDisplay() {
    const problemNum = Nums[Math.floor(Math.random() * Nums.length)]
    return String(problemNum).split('').join('+').split('')
  }

  return (
    <div>
      {isFailure ? (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <AlertDescription>
            {problem.join(' ')} = <b>{Floor(eval(problem.join('')), 1000)}</b>
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsFailure(false)} />
        </Alert>
      ) : isSuccess ? (
        <Alert status="success" mt={4}>
          <AlertIcon />
          <AlertDescription>
            {problem.join(' ')} = <b>{eval(problem.join(''))}</b>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert status="info" bg="gray.100" mt={4}>
          <AlertIcon />
          No.{problem[0] + problem[2] + problem[4] + problem[6]}
        </Alert>
      )}
      <PloblemDisplay problem={problem} />
      <Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={1} w={300} mb={6} px={3}>
          {[1, 3, 5].map((item: number, index) => {
            return (
              <RadioGroup defaultValue={problem[item] || '+'} key={index} d="flex" mt="2" mx="auto" alignItems="center">
                <Stack spacing={5} direction="column">
                  {['+', '-', '*', '/'].map((operator: string) => {
                    return (
                      <Radio
                        isDisabled={isSuccess}
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
        {isSuccess ? (
          <div>
            <Button
              mx={2}
              bg="cyan.200"
              _hover={{ bg: 'cyan.400' }}
              color="gray.700"
              onClick={() => {
                setIsSuccess(false)
                const problemNum = Nums[Math.floor(Math.random() * Nums.length)]
                const strNum = String(problemNum)
                const prev = problem
                const problemDisplay: string[] = (
                  strNum[0] +
                  prev[1] +
                  strNum[1] +
                  prev[3] +
                  strNum[2] +
                  prev[5] +
                  strNum[3]
                ).split('')
                setProblem(problemDisplay)
              }}
            >
              別の問題へ
            </Button>
          </div>
        ) : (
          <Button
            bg="blue.500"
            _hover={{ bg: 'blue.700' }}
            color="white"
            onClick={() => {
              const answer = eval(problem.join(''))
              if (answer == 10) {
                setIsSuccess(true)
              } else {
                setIsFailure(true)
              }
            }}
          >
            送信
          </Button>
        )}
      </Center>
    </div>
  )
}

export default inputPanel
