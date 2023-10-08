import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import axios from "axios";

function AppForm() {


  return (
    <>
      <Box p={5} shadow="lg">
        <form onSubmit={async (e)=> {
          e.preventDefault()
          // TODO: improve type
          const formData = new FormData(e.target as any);

          try {
            const res = await axios.post('http://localhost:3001/login', Object.fromEntries(formData))
          
            res.data.token && localStorage.setItem('token', res.data.token)
            
          } catch (error) {
            console.log(error)
          }
        }}>

        <VStack>
          <Heading>Authentication</Heading>
          <Input name="email" placeholder="Enter your email" type="email"/>
          <Input name="password" placeholder="Enter your password" type="password"/>
          <Button type="submit">login</Button>
        </VStack>
        </form>
      </Box>
    </>
  );
}

export default AppForm;
