import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Button,
  Td,Tabs, TabList, TabPanels, Tab, TabPanel,
  TableCaption,
} from "@chakra-ui/react";
import "firebase/auth";

export default function Ranking(props) {
  return (
    <div>
      <Text my={4}>
        
      タイムアタックのランキングです。
      
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
          {props.rankingData.map((item:{name: string, count: number}, index:number)=>{
            return (
              <Tr key={index}>
                <Td p={1}>{index+1}</Td>
                <Td px={1}>{item.name} </Td>
                <Td p={1}>{item.count}</Td>
                </Tr>
              );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
