import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Button,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import "firebase/auth";

export default function Ranking(props) {
  return (
    <div>
      <Text my={4}>
        
        {props.name ? (
          <>
            {props.name} でログインしています。
            <Button colorScheme="teal" size="sm" variant="ghost" onClick={props.handleClickTwitterLogout}>
              ログアウトする
            </Button>
          </>
        ):(
          <>
          <Button colorScheme="teal" variant="link" onClick={props.handleClickTwitterAuth}>
          ツイッター連携
          </Button> で、回数を記録できます。
          </>
        )}
      
      </Text>
      <Table size="sm" mt={8}>
        <Thead>
          <Tr>
            <Th p={1}>Rank</Th>
            <Th  p={1}>Name</Th>
            <Th p={1}>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.rankingData.map((item:{screenName: string, count: number}, index:number)=>{
            return (
              <Tr key={index}>
                <Td p={1}>{index+1}</Td>
                <Td px={1}><Text color="blue.600" _hover={{color:"blue.300"}}><a href={"https://twitter.com/" + item.screenName} rel="nofollow" target="_blank">@{item.screenName}</a></Text>  </Td>
                <Td p={1}>{item.count}</Td>
                </Tr>
              );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
