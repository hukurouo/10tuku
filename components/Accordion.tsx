import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
} from "@chakra-ui/react";

export default function AccordionMenu(props) {
  return (
    <Accordion allowMultiple mt={8}>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text color="gray.700" fontWeight="semibold">クリア済みの解答例 (3/9)</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          {["1/2+3+4","1+2+3*4","1+2/3-4"].map((item,index)=>{
            return <Text key={index} fontSize={20}>{item} = 10</Text>
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
