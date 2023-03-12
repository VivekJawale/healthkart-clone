import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Box, Image, Text, Icon, useToast, Button } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';

const Cart = () => {

  const [data, setData] = useState([]);

  const toast = useToast();

  const dataa= JSON.parse(localStorage.getItem("cart"));
  console.log(dataa);

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    return axios.get(`https://lime-fawn-veil.cyclic.app/cart`)
      .then((r) => {
        setData(r.data)
        console.log(r.data);
      })
      .catch((e) => console.log(e));
  }

  
  const subfunc= (data) => {
    if(data.quantity>1){
      fetch(`https://lime-fawn-veil.cyclic.app/cart/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify({...data, "quantity":data.quantity-1}),
        headers: {
          "Content-Type" : "application/json"
        }
      }).then((r)=>getData()).then((r)=>console.log(data.quantity))
    }
  }

  const addfunc= (data) => {
    if(data.quantity<=4){
      fetch(`https://lime-fawn-veil.cyclic.app/cart/${data._id}`, {
        method: "PATCH",
        body: JSON.stringify({...data, "quantity":data.quantity+1}),
        headers: {
          "Content-Type" : "application/json"
        }
      }).then((r)=>getData()).then((r)=>console.log(data.quantity))
    }else{
      toast({
        title: `Only 4 products are available`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  

  return (
    <Box bg="#d9d9d9">
      <Box w="82%" m="auto">
        <Box display={["inline", "inline", "flex"]} justifyContent="space-between" alignItems="center" >
          <Box mt="15px" rounded="10px" bg="white" w="70%" p="20px">
            <Box>
              <Text color="#595959" mb="5px" fontWeight="600" fontSize="25px">Shopping Cart ({dataa.length}) Items</Text>
            </Box>
            <Box>
              {dataa && dataa.map((el)=>{
                return <Box key={el._id} border="1px solid #bfbfbf" rounded="13px" mb="15px" display="flex" justifyContent="space-between" alignItems="center" p="25px">
                      <Box p="5px" rounded="5px" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
                        <Image boxSize={["45px", "55px", "65px"]} src={el.image} alt="img" />
                      </Box>
                      <Box w="70%">
                        <Text color="#424040" fontSize={["14px", "16px", "18px"]}>{el.name}</Text>
                        <Box display="flex" alignItems="center" gap={["9px", "12px", "15px"]}>
                          <Text mt="0" fontWeight="600" fontSize={["12px", "14px", "16px"]}>₹{el.price1}</Text>
                          <Text mt="0" fontSize={["11px", "12px", "13px"]} fontWeight="bold" color="green">({el.discount}% off)</Text>
                          <Text mt="0" color="#424040" fontSize={["11px", "13px", "15px"]} textDecoration="line-through">₹ {el.price2}</Text>
                          <Box rounded="5px" border="1px solid #f66809" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                            <Button onClick={(el)=>subfunc(el)} isDisabled={el.quantity===1} bg="white">-</Button>
                            <Button bg="white" border="none">{el.quantity}</Button>
                            <Button onClick={(el)=>addfunc(el)} isDisabled={el.quantity===4} bg="white" border="none">+</Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Icon boxSize={6} as={AiOutlineDelete} />
                      </Box>
                </Box>
              })}
            </Box>
          </Box>
          <Box bg="white"></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart