import { Box, Button, Image, Select, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar';
import SubNav from '../SubNav';

const SearchPage = () => {

  const [ page, setPage]= useState(1);
  
  const location= useLocation();

  const [searchParams, setSearchParams]= useSearchParams(); 

  const initialSort= searchParams.getAll("priceSort");

  const [sort, setSortBy]= useState( initialSort || '');

  const [search, setsearch]= useState(location.pathname.split("/")[3].split(":")[1]);

  const handleSort= (e)=>{
    setSortBy(e.target.value);
}

useEffect(()=>{
    let params={};
    sort && (params.priceSort= sort);
    setSearchParams(params);
}, [setSearchParams, searchParams, sort]);



  
const [data, setData]= useState([]);

useEffect(()=>{
  if(location || data.length===0){
      setsearch(location.pathname.split("/")[3].split(":")[1]);
      const getDataParams={
          params: {
            priceSort: sort&&sort,
          }
      }
      getData(getDataParams);
  }
}, [data.length, location.search, page, sort, searchParams]);

const handlePageChange = (value) => {
  setPage(page + value);
};




const getData= (params)=>{
  return axios.get(`https://lime-fawn-veil.cyclic.app/product?input=${search}&page=${page}&limit=51`, params)
      .then((r)=>{
        setData(r.data)
      })
      .catch((e)=>console.log(e));
  }


  return (
    <Box>
      <Box>
    <Box>
      {/* {data.length>0 && <Box w="80%" m="15px auto" justifyContent="right" display="flex" alignItems="center">
        <Box w={["65%", "40%", "30%"]} border="1px solid gray" rounded="10px" p={["3px 6px", "4px 8px", "5px 10px"]} justifyContent="flex-start" display="flex" alignItems="center">
          <Text w="35%" m="0" fontSize={["13px", "14px", "16px"]}>Sort By: </Text>
          <Select border="none" outline="2px solid white" p="0px" fontSize={["13px", "14px", "16px"]} bg="white" color="black" onChange={handleSort}>
              <option p={["0px", "5px", "10px"]} value="" name="sortBy">Popularity</option>
              <option p={["0px", "5px", "10px"]} value="asc" name="sortBy">Price: Low to High</option>
              <option p={["0px", "5px", "10px"]} value="desc" name="sortBy">Price: High to Low</option>
          </Select>
        </Box>
      </Box>} */}
      <Box w={["85%", "80%", "80%"]} m="auto" mb="10px">
        <Text fontSize={["22px", "30px", "35px"]}>Search Results for : {location.pathname.split("/")[3].split(":")[1]}</Text>
      </Box>
      <Box w="80%" m="auto" display="grid" gap="20px" gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} >
        {data && data.map((el)=>{
            return <ProductCard key={el._id} props={el} />
        })}
      </Box>
    </Box>
    {data.length===0 && <Image w="85%" h="475px" m="auto" src="https://ghrce.raisoni.net/assets/images/gif/404.gif" />}
    </Box>
    </Box>
  )
}

export default SearchPage
