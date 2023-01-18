import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  //const [pic, setPic] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const history = useHistory();

  const invertValue = () => setShow(!show);
  const url = "http://localhost:5000/api/user";

  // const postDetails = (pics) => {
  //   setLoading(true);
  //   if (pics === undefined) {
  //     toast({
  //       title: "Please Select an image",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }
  //   if (pics.TYPE === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "chat-app");
  //     data.append("cloud_name", "djmetmole");
  //     fetch("https://api.cloudinary.com/v1_1/djmetmole", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   } else {
  //     toast({
  //       title: "Please Select an image",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //     return;
  //   }
  // };
  
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Did not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(url, { name, email, password }, config);
      console.log(data);

      toast({
        title: "Registration Successfull",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify());
      setLoading(false);

      history.push("/");
    } catch (error) {
      toast({
        title: "Error Occured here!",
        description: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={invertValue}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={invertValue}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          //onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15, color: "black" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
};
export default Signup;
