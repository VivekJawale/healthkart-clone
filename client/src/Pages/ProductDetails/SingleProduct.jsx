
import { useParams } from "react-router-dom";
import { ImageMagnifier } from "./thumbnailcarousal";
import "./SingleProduct.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Box, Link,Icon, Text } from "@chakra-ui/react";
import { RiHome2Fill } from 'react-icons/ri';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AiFillStar } from 'react-icons/ai';

export default function SingleProduct() {

  const [data, setdata] = useState([]);
  const { id } = useParams();
  console.log(id);

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
  
  console.log(data);


  return (
    <>
      {/* <Navbar /> */}
      <div id="add_div"></div>
      <Box w={["90%", "90%", "80%"]} m="auto">
        <Box>
          <Box display="flex" gap="5px" alignItems="center">
            <Link href="/"><Icon color="#2eb8b8" as={RiHome2Fill} /></Link>
            <Icon color="#2eb8b8" as={ChevronRightIcon} />
            <Link href={`/products/${data._id}`} fontSize="14px">{data.name}</Link>
          </Box>
        </Box>
        <Box p="40px 0px 150px 0px" display={["inline", "inline", "flex"]} justifyContent="space-between">
          <Box w="40%" display="flex" justifyContent="center">
            <Box p="25px 50px" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" rounded="5px">
              <ImageMagnifier width={"308px"} height={"337px"} src={data.image} />
            </Box>
          </Box>
          <Box p="10px" w="55%">
            <Text h="45px" overflow="clip" fontSize={["18px", "20px", "22px"]} fontFamily="'Trebuchet MS', sans-serif" color="#424040" >{data.name}</Text>
            <Box m="5px 0px" display="flex" gap="10px" alignItems="center">
              <Text mt="0" color="#424040" fontSize="17px" fontWeight="bold">₹ {data.price1}</Text>
              <Text mt="0" color="#424040" fontSize="16px" textDecoration="line-through">₹ {data.price2}</Text>
              <Text mt="0" fontSize="13px" fontWeight="bold" color="green">{data.discount}% off</Text>
            </Box>
            <Box w="50%">
              <Box p="0" display="flex" gap="5px" alignItems="center" >
                <Box boxSize="25px" display="flex" justifyContent="center" alignItems="center" border="1px solid #f66809" rounded="50%">
                  <Icon m="0" boxSize={4} color="#f66809" as={AiFillStar}/>
                </Box>
                <Text color="#424040" fontSize="16px">₹ {data.bold ? data.bold : data.price1}</Text>
                <Text color="#424040" fontSize="16px"> for Premium Member</Text>
              </Box>
            </Box>
            <Box w="100%" h="245px" mt="15px">
              <Accordion flush style={{ width: "683px", height: "245px" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>DESCRIPTION</Accordion.Header>
                  <Accordion.Body>{data.description}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>REVIEWS</Accordion.Header>
                  <Accordion.Body>
                    <Box display="flex" gap="15px" alignItems="center" mt={2} mb={4}>
                      <Box bg="#2eb8b8" p="5px 10px" display="flex" justifyContent="space-between" alignItems="center">
                        <Text m="0" color="white" fontSize="15px">{data.star_rating}</Text>
                        <Icon m="0" boxSize={4} color="white" as={AiFillStar} />
                      </Box>
                      <Text fontSize="16px">{data.flexing_reviews}</Text>
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ----------------------------------------------fixed under bar----------------------------------------------------------- */}

      <div
        style={{
          width: "100%",
          margin: "auto",
          height: "90px",
          paddingBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
        }}
        className="fixed_cart"
      >
        <div
          style={{
            width: "511px",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginLeft: "110px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e4e4e4",
              borderRadius: "12px",
              width: "71px",
              height: "77px",
            }}
          >
            <img
              src={data.image}
              alt=""
              style={{ width: "48px", height: "58px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "411px",
                height: "23px",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginLeft: "10px",
              }}
            >
              <span style={{ color: "#212121", fontSize: "14px" }}>
                {data.name}
              </span>
            </div>

            <div
              style={{
                width: "411px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                ₹{data.price1}
                <span
                  style={{
                    color: "#FC2779",
                    fontSize: "14px",
                    marginLeft: "10px",
                  }}
                >
                  ( 20% Off)
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: "708px",
            height: "90px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              border: "2px solid #000",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() =>alert("Added to wishlist")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "0px" }}
              fill="#000"
              width="30"
              height="30"
              viewBox="0 0 512 512"
            >
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            </svg>
          </div>

          <Button
            style={{
              width: "222px",
              height: "44px",
              marginLeft: "20px",
              borderRadius: "5px",
              backgroundColor: "#000000",
              color: "#fff",
              boxShadow: "inset 0 0 30px #616060",
              fontWeight: "bold",
            }}
            onClick={() => {
              alert("Added to cart")
            }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </>
  );
}