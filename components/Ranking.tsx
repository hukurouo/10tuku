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

export default function Ranking() {
  return (
    <div>
      <Text my={4}>
      <Button colorScheme="teal" variant="link">
      ツイッター連携
      </Button> で、ユーザー名を登録できます
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
          <Tr>
            <Td p={1} >1</Td>
            <Td p={1}>@hukhukurouaa</Td>
            <Td p={1}>3411</Td>
          </Tr>
          <Tr>
            <Td p={1}>2</Td>
            <Td p={1}>@hukurouo_code</Td>
            <Td p={1}>6</Td>
          </Tr>
          <Tr>
            <Td p={1}>3</Td>
            <Td p={1}>@owlbook248</Td>
            <Td p={1}>3</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}
