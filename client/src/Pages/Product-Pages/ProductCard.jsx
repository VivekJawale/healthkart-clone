import React from 'react'
import { Box, Button, Icon, Image, Text } from '@chakra-ui/react'
import { BiHeart } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { addtocart } from '../../Redux/Cart/cart.action';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../Redux/store';


const ProductCard = ({ props }) => {
  const dispatch=useDispatch();
  const cartData = useSelector((store) => store.CartReducer);

  console.log(cartData);
  const handlecart= (data)=>{
    let newcart2=cartData.filter((el)=>{
      return el._id===data._id
     })
     if(newcart2.length>0){
      swal({
        title:"Item already available in cart",
        text:"It seems item is already present in your cart",
        icon:"warning"
      })
     }
     else{
      let newcart=[...cartData,data]
      dispatch(addtocart(newcart));
      swal({
        title:"Added to cart successfully!",
        text:"You can checkout after login!",
        icon:"success"
      })
     }
  }


  return (
    <Box _hover={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px" }}
      border="0px solid #C8C8C8" rounded="5px" p="10px" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
      <Box w="100%" display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="none" bg="#404040" color="white" p="5px 15px">
          <Text m="0" fontSize="14px">Add to Wishlist</Text>
        </Box>
        <Icon boxSize="30px" color="#424040" as={BiHeart} />
      </Box>
      <Image w="60%" m="auto" h="180px" src={props.image} alt="img" />
      <Box borderTop="1px solid #B8B8B8" textAlign="left" padding="10px">
        <Box display="flex" justifyContent="space-between" alignItems="center" >
          <Box w="100%" display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={4}>
            <Box bg="#2eb8b8" p="5px 10px" display="flex" justifyContent="space-between" alignItems="center">
              <Text m="0" color="white" fontSize="15px">{props.star_rating}</Text>
              <Icon m="0" boxSize={4} color="white" as={AiFillStar} />
            </Box>
            <Text fontSize="16px">{props.flexing_reviews}</Text>
          </Box>
        </Box>
        <Text h="45px" overflow="clip" fontFamily="'Trebuchet MS', sans-serif" color="#424040" mb={5} >{props.name}</Text>
        <Box w="100%" m="5px 0px" display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Text mt="0" color="#424040" fontSize="17px" fontWeight="bold">₹ {props.price1}</Text>
          <Text mt="0" color="#424040" fontSize="16px" textDecoration="line-through">₹ {props.price2}</Text>
          <Text mt="0" fontSize="13px" fontWeight="bold" color="green">{props.discount}% off</Text>
        </Box>
        <Box bg="#f1f4f4">
          <Box w="100%" m="auto" p="0" display="flex" justifyContent="space-between" alignItems="center" >
            <Box boxSize="20px" display="flex" justifyContent="center" alignItems="center" border="1px solid #f66809" rounded="50%">
              <Icon m="0" boxSize={3} color="#f66809" as={AiFillStar}/>
            </Box>
            <Text color="#424040" fontSize="14px">₹ {props.bold ? props.bold : props.price1}</Text>
            <Text color="#424040" fontSize="14px"> for Premium Member</Text>
          </Box>
        </Box>
        <Button onClick={()=>{handlecart(props)}}  _hover={{ bg: "#f66809", color: "white" }} mt="15px" fontWeight="bold" bg="white" w="100%" fontSize="16px"
          rounded="8px" p="13px 0px" leftIcon={<FiShoppingCart />} color="#f66809" border="1px solid #f66809">Add to Cart</Button>
      </Box>
    </Box>
  )
}

export default ProductCard
