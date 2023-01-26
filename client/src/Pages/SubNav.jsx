import { Box, Link, Text, Icon, LinkBox } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiMenuAlt1, HiLocationMarker } from 'react-icons/hi';
import { FaTag, FaBloggerB } from 'react-icons/fa';
import { RiCoupon3Fill } from 'react-icons/ri';
import { AiFillGift } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';

const SubNav = () => {

const [allcategories, setallcategories]= useState(false);
const [bestSellers, setbestSellers]= useState(false);

const handleHoverallcategory= ()=>{
  setallcategories(!allcategories);
  setbestSellers(false);
}

const handleHoverbestSellers= ()=>{
  setbestSellers(!bestSellers);
  setallcategories(false);
}


  return (
    <Box display={["none", "none", "inline"]}>
      <Box>
        <Box w="80%" p="17px 0px" m="auto" mb="0px" display="flex" justifyContent="space-between" alignItems="center">
          <Box onClick={()=>handleHoverallcategory()} p="7px 17px" border="1px solid #a6a6a6" rounded="5px" display="flex" justifyContent="space-between" alignItems="center" >
            <Icon color="#2eb8b8" boxSize="22px" as={HiMenuAlt1} />
            <Text color="#595959" m="0">Shop By Category</Text>
          </Box>
          <Box w="80%" display="flex" gap="5px" justifyContent="space-between" alignItems="center">
            <Link display="flex" gap="5px" justifyContent="space-between" alignItems="center">
              <Icon color="#666666" as={RiCoupon3Fill} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Deals</Text>
            </Link>
            <Link onClick={()=>handleHoverbestSellers()} gap="5px" display="flex" justifyContent="space-between" alignItems="center">
              <Icon color="#2eb8b8" as={FaTag} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Best Sellers</Text>
            </Link>
            <Link display="flex" gap="5px" justifyContent="space-between" alignItems="center">
              <Icon color="#666666" as={FaBloggerB} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Blogs</Text>
            </Link>
            <Link display="flex" gap="5px" justifyContent="space-between" alignItems="center">
              <Icon color="#666666" as={AiFillGift} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Gift Card</Text>
            </Link>
            <Link display="flex" gap="5px" justifyContent="space-between" alignItems="center">
              <Icon color="#666666" as={BsFillChatDotsFill} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Customer Support</Text>
            </Link>
            <Link display="flex" gap="5px" justifyContent="space-between" alignItems="center">
              <Icon color="#666666" as={HiLocationMarker} />
              <Text _hover={{ color:"#2eb8b8"}} fontSize="16px" color="#333333">Store Locator</Text>
            </Link>
          </Box>
        </Box>
        <Box display={allcategories? "inline" : "none"}>
          <Box w="80%" m="auto" display="flex" justifyContent="space-between" lineHeight="30px" textAlign="left">
            <Box w="23%" bg="#e6f2ff" lineHeight="40px">
              <Box _hover={{color:"#29a3a3", bg:"white"}}  p="10px">
                <Link>Sports Nutrition</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <LinkBox>Vitamins & Supplements</LinkBox>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Ayurveda & Herbs</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Health Food & Drinks</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Fitness</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Wellness</Link>
              </Box>
            </Box>
            <Box w="75%" fontSize="15px">
              <Box className='sportsnutritiondiv' display="flex" justifyContent="space-between">
                <Box w="20%">
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}} fontWeight="bold">Proteins</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Whey Proteins</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Beginners Whey Protein</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Whey Protein Isolate</Link><br/>
                  <Link _hover={{color:"#29a3a3"}}>Raw Whey Proteins</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Plant Proteins</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Protein for Women</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Protein Blends</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Casein Proteins</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Soy Proteins</Link><br/>
                </Box>
                <Box w="19%">
                  <Link  href="/products/gainers" _hover={{color:"#29a3a3"}} fontWeight="bold">Gainers</Link><br/>
                  <Link  href="/products/gainers" _hover={{color:"#29a3a3"}}>Weight Gainers</Link><br/>
                  <Link  href="/products/gainers" _hover={{color:"#29a3a3"}}>Mass Gainers</Link><br/>
                  <Link  href="/products/gainers" _hover={{color:"#29a3a3"}}>Herbal Weight Gainers</Link><br/>
                </Box>
                <Box w="19%">
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}} fontWeight="bold">Protein Foods</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Peanut Butter</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Muesli</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Protein Shakes</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Oats</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Cereals</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Granola</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Protein Bars</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Protein Water</Link><br/>
                </Box>
                <Box w="19%">
                  <Link href="/products/prepostworkout" fontWeight="bold">Pre/Post Workout</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Pre-Workout</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Creatine</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>BCAAs</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Carb Blends</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Electrolytes</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>EAA</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Nitric Oxide</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Other Supports</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Citrulline Malate</Link><br/>
                </Box>
                <Box w="19%">
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}} fontWeight="bold">Workout Essentials</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>Fat Burners</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>Consult Services</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>L Carnitine</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>Multivitamins for Bodybuilding</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>Pre Hormone</Link><br/>
                  <Link href='/products/workoutessential' _hover={{color:"#29a3a3"}}>ZMA</Link><br/>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={bestSellers? "inline" : "none"}>
          <Box w="30%" m="auto" display="flex" justifyContent="space-between" lineHeight="26px" textAlign="left">
            <Box w="40%" bg="#e6f2ff" lineHeight="35px">
              <Box _hover={{color:"#29a3a3", bg:"white"}}  p="10px">
                <Link>Sports Nutrition</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <LinkBox>Health Nutrition</LinkBox>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Fitness</Link>
              </Box>
              <Box _hover={{color:"#29a3a3", bg:"white"}} p="10px">
                <Link>Wellness</Link>
              </Box>
            </Box>
            <Box w="58%" fontSize="15px">
              <Box className='sportsnutritiondiv' display="flex" justifyContent="space-between">
                <Box>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Protein Powder</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Whey Protein</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Beginners Whey Protein</Link><br/>
                  <Link href="/products/protiens" _hover={{color:"#29a3a3"}}>Whey Protein Isolate</Link><br/>
                  <Link href="/products/gainers" _hover={{color:"#29a3a3"}}>Mass Gainer</Link><br/>
                  <Link href="/products/gainers" _hover={{color:"#29a3a3"}}>BCAA</Link><br/>
                  <Link href="/products/gainers" _hover={{color:"#29a3a3"}}>Fat Burners</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Pre Workout</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Creatine</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Protein Bars</Link><br/>
                  <Link href="/products/gainers" _hover={{color:"#29a3a3"}}>Weight Gainer</Link><br/>
                  <Link href="/products/protienfoods" _hover={{color:"#29a3a3"}}>Carb Blends</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Other Support</Link><br/>
                  <Link href="/products/prepostworkout" _hover={{color:"#29a3a3"}}>Casien Protein</Link><br/>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SubNav