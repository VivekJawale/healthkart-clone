import { Box, Button, Select, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const PrePostComp = () => {


 

  const [ page, setPage]= useState(1);
  
  const [searchParams, setSearchParams]= useSearchParams();

  const location= useLocation();

  const initialSort= searchParams.getAll("priceSort");

  const [sort, setSortBy]= useState( initialSort || '');
  const [category]= searchParams.getAll("category" || []);
  const [discountValue]= searchParams.getAll("discountByCat" || "");
  const [ratingvalue]= searchParams.getAll("rating" || "");
  const [pricevalue]= searchParams.getAll("priceByCat" || []);

  const handleSort= (e)=>{
    setSortBy(e.target.value);
}

useEffect(()=>{
    let params={};
    category && (params.category= category);
    discountValue && (params.discountByCat=discountValue);
    ratingvalue && (params.rating=ratingvalue);
    pricevalue && (params.priceByCat= pricevalue);
    sort && (params.priceSort= sort);
    setSearchParams(params);
}, [setSearchParams, searchParams, sort, discountValue, category,  ratingvalue, pricevalue]);



  
const [data, setData]= useState([]);

useEffect(()=>{
  if(location || data.length===0){
      const getDataParams={
          params: {
            input: category&&category,
            priceSort: sort&&sort,
            discountByCat: discountValue&&discountValue,
            priceByCat:pricevalue&&pricevalue
          }
      }
      getData(getDataParams);
  }
}, [data.length, location.search, page, searchParams]);

const handlePageChange = (value) => {
  setPage(page + value);
};



const getData= (params)=>{
  return axios.get(`https://lime-fawn-veil.cyclic.app/product?category=prepostworkout&page=${page}&limit=21`, params)
      .then((r)=>{
        setData(r.data)
      })
      .catch((e)=>console.log(e));
  }


  return (
    <Box>
      <Box w="95%" m="15px auto" justifyContent="right" display="flex" alignItems="center">
        <Box w={["65%", "40%", "30%"]} border="1px solid gray" rounded="10px" p={["3px 6px", "4px 8px", "5px 10px"]} justifyContent="flex-start" display="flex" alignItems="center">
          <Text w="35%" m="0" fontSize={["13px", "14px", "16px"]}>Sort By: </Text>
          <Select border="none" outline="2px solid white" p="0px" fontSize={["13px", "14px", "16px"]} bg="white" color="black" onChange={handleSort}>
              <option p={["0px", "5px", "10px"]} value="" name="sortBy">Popularity</option>
              <option p={["0px", "5px", "10px"]} value="asc" name="sortBy">Price: Low to High</option>
              <option p={["0px", "5px", "10px"]} value="desc" name="sortBy">Price: High to Low</option>
          </Select>
        </Box>
      </Box>
      <Box w="100%" display="grid" gap="20px" gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} >
        {data && data.map((el)=>{
            return <ProductCard key={el._id} props={el} />
        })}
      </Box>
      <Box w="50%" m="auto" mt="20px" textAlign="center" mb="20px" display="flex" gap="10px">
      <Button border="1px solid black" rounded="5px" fontWeight="bold" fontSize="16px" p="15px 15px" disabled={page === 1} onClick={() => handlePageChange(-1)}>
        PREV
      </Button>
      <Button border="1px solid black" rounded="5px" fontWeight="bold" fontSize="16px" p="15px 15px">{page}</Button>
      <Button border="1px solid black" rounded="5px" fontWeight="bold" fontSize="16px" p="15px 15px" disabled={page === 23} onClick={() => handlePageChange(1)}>NEXT</Button>
      </Box>
    </Box>
  )
}

export default PrePostComp
