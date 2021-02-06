import { useState, useEffect } from 'react'
import {
  Center,
  Stack,
  Input,
  Box,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import TimeAttack from '../components/TimeAttack'

export default function TimeAttackMenu() {
  const [time, setTime] = useState(0)
  const [status, setStatus] = useState('ready')

  useEffect(()=>{
    const timer = setInterval(()=>{
      setTime(time+1)
      console.log(time)
    },1000)
    if (time > 18) {
      //setStatus("finished")
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <>
      {status == 'running' ? (
        <TimeAttack
          time={time}
        />
      ) : (
        <Center mt={8}>
          {status == 'ready' ? (
            <Stack align="center">
              <Text mb={4}>制限時間は3分間です。</Text>
              <Button mx={2} bg="gray.200" _hover={{ bg: 'gray.400' }} color="gray.700" onClick={() => {
                setStatus("running")
                setTime(0)
              }}>
                タイムアタック開始
              </Button>
            </Stack>
          ) : (
            <Stack align="center">
              <div>
                <b> finished!</b>
              </div>

              <Text mb={8}>3分間で{this.state.TAcount}個の10を作りました。</Text>
              <Box align="center" mb={8}>
                {this.state.TAinputField ? (
                  <>
                    <FormControl isInvalid={this.state.TAinputValidation}>
                      <Input
                        placeholder="名前を入力"
                        size="md"
                        value={this.state.TAname}
                        onChange={this.handleNameChange}
                        isRequired={true}
                      />{' '}
                      {this.state.TAname == '' ? (
                        <FormErrorMessage>名前を入力してください</FormErrorMessage>
                      ) : (
                        <FormErrorMessage>30文字以上の名前は登録できません</FormErrorMessage>
                      )}
                    </FormControl>

                    <Button
                      mt={4}
                      bg="green.200"
                      _hover={{ bg: 'green.300' }}
                      color="gray.700"
                      onClick={() => this.TAsubmit()}
                    >
                      記録する
                    </Button>
                  </>
                ) : (
                  <>記録しました。</>
                )}
              </Box>
              <Button bg="blue.200" _hover={{ bg: 'blue.300' }} color="gray.700" onClick={() => this.twitterShareTA()}>
                結果をツイート
              </Button>
              <Button bg="gray.200" _hover={{ bg: 'gray.300' }} color="gray.700" onClick={() => this.TAstart()}>
                もう一度プレイ
              </Button>
            </Stack>
          )}
        </Center>
      )}
    </>
  )
}
