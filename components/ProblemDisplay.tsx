import { Center, Box, Grid } from "@chakra-ui/react";

export function PloblemDisplay(props: {problem: string[]}) {
  return (
    <Center>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} w={300} mt={4} mb={8}>
        {props.problem.map((item, index) => {
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
  );
}
