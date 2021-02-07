import { useState, useEffect } from 'react'
import { Stack, Input, Box, Button, Text, FormControl, FormErrorMessage } from '@chakra-ui/react'
import TimeAttack from '../components/TimeAttack'
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

export default function TimeAttackMenu() {
  const [time, setTime] = useState(0)
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState('ready')
  const [isDisplayInputField, setIsDisplayInputField] = useState(true)
  const [inputValidation, setInputValidation] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1)
    }, 1000)
    if (time > 180 && status === "running") {
      setStatus('finished')
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  })

  function countUp() {
    setCount(count + 1)
  }

  function handleNameChange(e: { target: { value: string; }; }){
    setName(e.target.value)
    setInputValidation(false)
  }

  function submitScore(){
    if (name == "" || name.length > 30) {
      setInputValidation(true)
      return;
    }
    setIsDisplayInputField(false)
    db.collection("TimeAttackRanking")
      .add({
        name: name,
        count: count,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }

  function twitterShareTA() {
    var shareURL =
      "https://twitter.com/intent/tweet?text=" +
      `3分間で${count}個の10を作りました！` +
      "&url=" +
      `https://10tuku.hukurouo.com/`;
    window.open(
      shareURL,
      "SNS_window",
      "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes"
    );
  };

  function switchMenuDisplay() {
    switch (status) {
      case 'running':
        return (
          <TimeAttack
            time={time}
            count={count}
            countUp={() => {
              countUp()
            }}
          />
        )
      case 'ready':
        return (
          <Stack align="center">
            <Text mb={4}>制限時間は3分間です。</Text>
            <Button
              mx={2}
              bg="gray.200"
              _hover={{ bg: 'gray.400' }}
              color="gray.700"
              onClick={() => {
                setStatus('running')
                setTime(0)
                setCount(0)
              }}
            >
              タイムアタック開始
            </Button>
          </Stack>
        )
      case 'finished':
        return (
          <Stack align="center">
            <div>
              <b> finished!</b>
            </div>
            <Text mb={8}>3分間で{count}個の10を作りました。</Text>
            <Box align="center" mb={8}>
              {isDisplayInputField ? (
                <>
                  <FormControl isInvalid={inputValidation}>
                    <Input
                      placeholder="名前を入力"
                      size="md"
                      value={name}
                      onChange={(e) => handleNameChange(e)}
                      isRequired={true}
                    />
                    {name == '' ? (
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
                    onClick={() => submitScore()}
                  >
                    記録する
                  </Button>
                </>
              ) : (
                <>記録しました。</>
              )}
            </Box>
            <Button bg="blue.200" _hover={{ bg: 'blue.300' }} color="gray.700" onClick={() => twitterShareTA()}>
              結果をツイート
            </Button>
            <Button bg="gray.200" _hover={{ bg: 'gray.300' }} color="gray.700" onClick={() => setStatus('ready')}>
              もう一度プレイ
            </Button>
          </Stack>
        )
    }
  }

  return <>{switchMenuDisplay()}</>
}
