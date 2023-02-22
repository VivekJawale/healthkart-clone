
import { useNavigate, useParams } from "react-router-dom";
import { ImageMagnifier } from "./thumbnailcarousal";
import "./SingleProduct.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Box, Link,Icon, Text, useToast, Image } from "@chakra-ui/react";
import { RiHome2Fill } from 'react-icons/ri';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AiFillStar } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { addtocart } from '../../Redux/Cart/cart.action';

export default function SingleProduct() {

  const [data, setdata] = useState([]);
  const { id } = useParams();

  const maxquantity= data.quantity;

  const [curr, setCurr]= useState(1);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [id]);

  useEffect(() => {
    function returnfetch() {
      return fetch(
        `https://lime-fawn-veil.cyclic.app/product/${id}`
      ).then((res) => res.json());
    }

    returnfetch().then((res) => {
      setdata(res);
    });
  }, [id]);


  const dispatch=useDispatch();
  const cartData = useSelector((store) => store.CartReducer);
  const navigate= useNavigate();

  const toast = useToast()

  
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

  const subfunc= () => {
    if(curr>1){
      setCurr((prev)=>prev-1);
    }
  }

  const addfunc= () => {
    if(curr<maxquantity){
      setCurr((prev)=>prev+1);
    }else{
      toast({
        title: `Only ${maxquantity} products are available`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  


  return (
    <>
      {/* <Navbar /> */}
      <div id="add_div"></div>
      <Box w={["90%", "90%", "80%"]} m="auto" pb="120px" >
        <Box>
          <Box display="flex" pt="10px" gap="5px" alignItems="center">
            <Link href="/"><Icon color="#2eb8b8" as={RiHome2Fill} /></Link>
            <Icon color="#2eb8b8" as={ChevronRightIcon} />
            <Link href={`/products/${data._id}`} fontSize={["11px", "12px", "14px"]}>{data.name}</Link>
          </Box>
        </Box>
        <Box p="30px 0px" display={["inline", "inline", "flex"]} justifyContent="space-between">
          <Box w={["50%", "50%", "40%"]} m={["auto", "auto", "0px"]} display="flex" justifyContent="center">
            <Box p="25px 50px" 
            // boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" 
            rounded="5px">
              <ImageMagnifier width={"288px"} height={"327px"} src={data.image} />
            </Box>
          </Box>
          <Box p="10px" w={["100%", "90%", "55%"]} m={["auto", "auto", "0px"]}>
            <Text color="#2eb8b8" fontSize={["12px", "13px", "15px"]} fontFamily="'Trebuchet MS', sans-serif" >{data.category}</Text>
            <Text fontSize={["18px", "20px", "22px"]} fontWeight="600" fontFamily="'Trebuchet MS', sans-serif" color="#424040" >{data.name}</Text>
            <Text fontSize={["14px", "16px", "18px"]} color="#2eb8b8" >BY {data.name?.split(" ")[0]}</Text>
            <Box display="flex" gap="15px" alignItems="center" mt={2} mb={4}>
              <Box bg="#2eb8b8" p="5px 10px" display="flex" justifyContent="space-between" alignItems="center">
                  <Text m="0" color="white" fontSize="15px">{data.star_rating}</Text>
                  <Icon m="0" boxSize={4} color="white" as={AiFillStar} />
              </Box>
              <Text fontSize="16px">{data.flexing_reviews}</Text>
            </Box>
            <Text mt="0" color="#5b5757" fontSize={["14px", "16px", "18px"]} textDecoration="line-through">MRP: ₹ {data.price2}</Text>
            <Box m="5px 0px 0px 0px" display="flex" gap="10px" alignItems="center">
              <Text mt="0" color="#343232" fontSize={["14px", "16px", "18px"]} fontWeight="600">PRICE : ₹ {data.price1}</Text>
              <Text mt="0" fontSize={["13px", "15px", "17px"]} fontWeight="600" color="green">{data.discount}% off</Text>
            </Box>
            <Text mt="0" fontSize={["10px", "11px", "12px"]} color="green">Inclisive of all taxes</Text>
            <Box w={["100%", "80%", "45%"]} rounded="3px">
              <Box p="7px" bg="#f1f4f4" display="flex" gap="5px" alignItems="center" >
                <Box boxSize={["20px", "22px", "25px"]} display="flex" justifyContent="center" alignItems="center" border="1px solid #f66809" rounded="50%">
                  <Icon m="0" boxSize={[3, 4, 4]} color="#f66809" as={AiFillStar}/>
                </Box>
                <Text color="#424040" fontSize={["13px", "14px", "15px"]}>₹ {data.bold ? data.bold : data.price1}</Text>
                <Text color="#424040" fontSize={["13px", "14px", "15px"]}> for Premium Member </Text>
              </Box>
            </Box>
            <Box m="15px 0px" w={["100%", "63%", "50%"]} bg="none" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Button onClick={()=>subfunc()} isDisabled={curr===1} bg="white" border="none">-</Button>
                <Button bg="white" border="none">{curr}</Button>
                <Button onClick={()=>addfunc()} isDisabled={curr===maxquantity} bg="white" border="none">+</Button>
              </Box>
              <Box>
                <Button onClick={()=>{handlecart(data)}}  _hover={{ bg: "#f66809", color: "white" }} mt="15px" fontWeight="bold" bg="white" 
                  w="100%" fontSize="16px" rounded="8px" p="13px 0px" leftIcon={<FiShoppingCart />} color="#f66809" border="1px solid #f66809">
                  <Icon as={FiShoppingCart} /> Add To Cart
                </Button>
              </Box>
            </Box>
            <Box w="100%" mt="15px">
              <Accordion style={{ width: "100%" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>DESCRIPTION</Accordion.Header>
                  <Accordion.Body>
                    Protein’s bioavailability for the body ensures higher muscle gains or better 
                    post-workout recovery. MB’s International & Indian patents-published Enhanced Absorption Formula 
                    (EAF®) - also known as MB EnzymePro® - ensures 50% higher protein absorption and 60% higher BCAA 
                    absorption.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="fixed" p="15px 0px" bottom="0" zIndex="100" w="100%" bg="white" boxShadow= "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px">
        <Box w={["90%", "90%", "70%"]} m="auto" display="flex" alignItems="center" justifyContent="space-between">
          <Box p="5px" rounded="5px" boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px">
            <Image boxSize={["35px", "45px", "55px"]} src={data.image} alt="img" />
          </Box>
          <Box>
            <Text color="#424040" fontSize={["11px", "13px", "15px"]}>{data.name}</Text>
            <Box display="flex" alignItems="center" gap={["9px", "12px", "15px"]}>
              <Text mt="0" fontWeight="600" fontSize={["16px", "18px", "20px"]}>₹{data.price1}</Text>
              <Text mt="0" fontSize={["11px", "12px", "13px"]} fontWeight="bold" color="green">({data.discount}% off)</Text>
            </Box>
          </Box>
            <Button onClick={()=>{handlecart(data)}}  _hover={{ bg: "#f66809", color: "white" }} fontWeight="bold" bg="white" 
             fontSize={["12px", "14px", "16px"]} rounded="8px" p={["5px 0px", "8px 0px", "13px 0px"]} leftIcon={<FiShoppingCart />} color="#f66809" border="1px solid #f66809">
              <Icon as={FiShoppingCart} /> Add To Cart
            </Button>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </>
  );
}