import React, { useEffect } from 'react'
import BigCarousalHome from '../../Components/HomePage/BigCarousalHome';
import MiniHomeCarousal from '../../Components/HomePage/MiniHomeCarousal';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./home.css";
import DontMissFour from '../../Components/HomePage/DontMissFour';
import ProductCard from '../Product-Pages/ProductCard';
import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [wheyData,setWhey]=useState([]);
    const [gainerData,setGainer]=useState([]);
    const [protienfoodsData,setProteinfoods]=useState([]);
    const [workoutData,setWorkout]=useState([]);

    const firstDontMiss = [
        "https://img7.hkrtcdn.com/22780/bnr_2277906_o.jpg",
        "https://img5.hkrtcdn.com/22890/bnr_2288974_o.jpg",
        "https://img7.hkrtcdn.com/23009/bnr_2300876_o.jpg",
        "https://img3.hkrtcdn.com/22780/bnr_2277952_o.jpg",
      ];
    
      const secondDontMiss = [
        "https://img7.hkrtcdn.com/22576/bnr_2257566_o.jpg",
        "https://img1.hkrtcdn.com/22576/bnr_2257570_o.jpg",
        "https://img9.hkrtcdn.com/22576/bnr_2257568_o.jpg",
        "https://img3.hkrtcdn.com/22576/bnr_2257572_o.jpg",
      ];
    
      const firstBigHomeCarousel = [
        "https://img1.hkrtcdn.com/21499/bnr_2149800_o.jpg",
        "https://img7.hkrtcdn.com/23052/bnr_2305126_o.png",
        "https://img5.hkrtcdn.com/23005/bnr_2300404_o.jpg",
        "https://img3.hkrtcdn.com/23005/bnr_2300412_o.jpg",
        "https://img7.hkrtcdn.com/22987/bnr_2298686_o.jpg",
        "https://img9.hkrtcdn.com/23005/bnr_2300428_o.jpg",
        "https://img7.hkrtcdn.com/22468/bnr_2246796_o.jpg",
      ];
    
      const firstMiniHomeCarousal = [
        "https://img9.hkrtcdn.com/22910/bnr_2290998_o.png",
        "https://img3.hkrtcdn.com/22988/bnr_2298722_o.jpg",
      ];
    
      const secondMiniHomeCarousal = [
        "https://img7.hkrtcdn.com/23052/bnr_2305106_o.jpg",
        "https://img5.hkrtcdn.com/22814/bnr_2281334_o.png",
        "https://img5.hkrtcdn.com/22781/bnr_2278004_o.png",
        "https://img3.hkrtcdn.com/22781/bnr_2278002_o.jpg",
      ];
    
      const multiCarousalNoProduct = [
        "https://img1.hkrtcdn.com/22083/bnr_2208240_o.png",
        "https://img5.hkrtcdn.com/22083/bnr_2208244_o.png",
        "https://img7.hkrtcdn.com/22083/bnr_2208246_o.png",
        "https://img9.hkrtcdn.com/22083/bnr_2208248_o.png",
        "https://img1.hkrtcdn.com/22083/bnr_2208250_o.png",
        "https://img3.hkrtcdn.com/22083/bnr_2208252_o.png",
        "https://img3.hkrtcdn.com/22083/bnr_2208242_o.png",
        "https://img3.hkrtcdn.com/22243/bnr_2224292_o.png",
      ];
      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
      };

      const responsiveProd = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

      useEffect(()=>{
        let wheydatawithoutimage=[];
        let gainerdatawithoutimage=[];
        let proteinfooddatawithoutimage=[];
        let workoutdatawithoutimage=[];
         axios.get("https://lime-fawn-veil.cyclic.app/product?limit=24&category=whey").then((res)=>{
           for(let i=0;i<res.data.length;i++){
            if(wheydatawithoutimage.length==6){
                break;
            }
            if(res.data[i].image=="https://static1.hkrtcdn.com/hknext/static/media/common/lazyicon_new.webp"){
                continue;
            }
            else{
                wheydatawithoutimage.push(res.data[i]);
            }
           }
           setWhey(wheydatawithoutimage);
         }).catch((err)=>{console.log(err);})

         axios.get("https://lime-fawn-veil.cyclic.app/product?limit=100&category=gainers").then((res)=>{
            for(let i=0;i<res.data.length;i++){
             if(gainerdatawithoutimage.length==6){
                 break;
             }
             if(res.data[i].image=="https://static1.hkrtcdn.com/hknext/static/media/common/lazyicon_new.webp"){
                 continue;
             }
             else{
                gainerdatawithoutimage.push(res.data[i]);
             }
            }
            setGainer(gainerdatawithoutimage);
          }).catch((err)=>{console.log(err);})

          axios.get("https://lime-fawn-veil.cyclic.app/product?limit=24&category=proteinfoods").then((res)=>{
            for(let i=0;i<res.data.length;i++){
             if(proteinfooddatawithoutimage.length==6){
                 break;
             }
             if(res.data[i].image=="https://static1.hkrtcdn.com/hknext/static/media/common/lazyicon_new.webp"){
                 continue;
             }
             else{
                proteinfooddatawithoutimage.push(res.data[i]);
             }
            }
            setProteinfoods(proteinfooddatawithoutimage);
          }).catch((err)=>{console.log(err);})

          axios.get("https://lime-fawn-veil.cyclic.app/product?limit=24&category=prepostworkout").then((res)=>{
            for(let i=0;i<res.data.length;i++){
             if(workoutdatawithoutimage.length==6){
                 break;
             }
             if(res.data[i].image=="https://static1.hkrtcdn.com/hknext/static/media/common/lazyicon_new.webp"){
                 continue;
             }
             else{
                workoutdatawithoutimage.push(res.data[i]);
             }
            }
            setWorkout(workoutdatawithoutimage);
          }).catch((err)=>{console.log(err);})
      },[])

  return (
    <>
     <div className="largest_d2c_brand">
        India's Largest D2C Nutrition Platform
      </div>
      <div className="bigHomeCarousal">
        <BigCarousalHome data={firstBigHomeCarousel} />
      </div>
      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Mega Price Drop
      </h1>
      <div className='multiCarousalProduct'>
      <Carousel responsive={responsiveProd}>
          {wheyData.map((el) => {
            return (
                <ProductCard key={el._id} props={el}/>
            );
          })}
        </Carousel>
      
      </div>

      <DontMissFour data={firstDontMiss} />



      <div className="miniHomeCarousal">
        <MiniHomeCarousal data={firstMiniHomeCarousal} />
      </div>

      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Flash Sale
      </h1>
      <div className='multiCarousalProduct'>
      <Carousel responsive={responsiveProd}>
          {protienfoodsData.map((el) => {
            return (
                <ProductCard key={el._id} props={el}/>
            );
          })}
        </Carousel>
      
      </div>

      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Picks You Can't Miss
      </h1>
      <DontMissFour data={secondDontMiss} />

      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Trending Now
      </h1>
      <div className='multiCarousalProduct'>
      <Carousel responsive={responsiveProd}>
          {gainerData.map((el) => {
            return (
                <ProductCard key={el._id} props={el}/>
            );
          })}
        </Carousel>
      
      </div>

      <div className="miniHomeCarousal">
        <MiniHomeCarousal data={secondMiniHomeCarousal} />
      </div>


      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Shop by Category
      </h1>

      <div className="multiCarousalNoProduct">
        <Carousel responsive={responsive}>
          {multiCarousalNoProduct.map((el) => {
            return (
              <div>
                <img
                  style={{
                    width: "175px",
                    height: "185px",
                    borderRadius: "5px",
                  }}
                  src={el}
                  alt=""
                />
              </div>
            );
          })}
        </Carousel>
        ;
      </div>

     <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }}
      >
        Workout Essential
      </h1>
      <div className='multiCarousalProduct'>
      <Carousel responsive={responsiveProd}>
          {workoutData.map((el) => {
            return (
                <ProductCard key={el._id} props={el}/>
            );
          })}
        </Carousel>
      
      </div>

      <h1
        style={{
          textAlign: "left",
          fontSize: "25px",
          fontWeight: "600",
          padding: "0px 0px 5px",
          width: "80%",
          margin: "auto",
        }} className="why_healthkart_heading"
      >
        Why healthKart?
      </h1>

      <div className="why_healthkart">
      <div>
        <img style={{width:"68px",height:"70px"}} src="https://img9.hkrtcdn.com/20791/normal_2079088_o.png" alt="" />
        <p style={{fontSize:"18px",color:"#1c1c28",fontWeight:"600"}}>Wide range of Nutritional products</p>
        <p style={{fontSize:"16px",color:"#77777e",fontWeight:"normal"}}>One-stop fitness and health destination</p>
      </div>

      <div>
        <img style={{width:"68px",height:"70px"}} src="https://img3.hkrtcdn.com/20791/normal_2079092_o.png" alt="" />
        <p style={{fontSize:"18px",color:"#1c1c28",fontWeight:"600"}}>100% Original & Authentic</p>
        <p style={{fontSize:"16px",color:"#77777e",fontWeight:"normal"}}>Tight control on sourcing and distribution</p>
      </div>

      <div>
        <img style={{width:"68px",height:"70px"}} src="https://img1.hkrtcdn.com/20791/normal_2079090_o.png" alt="" />
        <p style={{fontSize:"18px",color:"#1c1c28",fontWeight:"600"}}>Guide to Fit and Healthy Lifestyle</p>
        <p style={{fontSize:"16px",color:"#77777e",fontWeight:"normal"}}>our true partner in health & wellness journey</p>
      </div>
      
      </div>
     
      <div className="download_healthkart_app_home">
        <div className="download_healthkart_app_home_left">
          <img
            src="https://i.postimg.cc/T20rg079/download-helthkart.jpg"
            alt=""
          />
        </div>
        <div className="download_healthkart_app_home_right">
          <div>
            <h1 style={{ color: "#1c1c28", marginTop: "3%" }}>Download the</h1>
            <h1 style={{ fontWeight: "600", color: "#1c1c28" }}>
              Helathkart Mobile app
            </h1>
          </div>

          <div style={{ flexDirection: "row" }} className="download_hover_div">
            <img
              style={{ borderRadius: "105px" }}
              src="https://i.postimg.cc/yxzCK93Q/Annotation-2023-01-26-171741.jpg"
              alt=""
            />
          </div>

          <div className="download_hover_div">
            <img
              style={{ width: "90%", height: "105px", borderRadius: "105px" }}
              src="https://i.postimg.cc/pTJq9n11/Annotation-2023-01-26-1717412.jpg"
              alt=""
            />
          </div>

          <div className="download_hover_div">
            <img
              style={{ width: "90%", height: "105px", borderRadius: "50%" }}
              src="https://i.postimg.cc/BvgKHc4D/Annotation-2023-01-26-1717413.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="play_store_apple"
              src="https://i.postimg.cc/0Q4r0V36/Annotation-2023-01-26-1717414.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="hk_premium_section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "576px", heiht: "230px" }}>
            <img
              style={{ width: "576px", heiht: "230px" }}
              src="https://i.postimg.cc/mhWLdksM/Annotation-2023-01-26-1717415.jpg"
              alt=""
            />
          </div>
          <div style={{ width: "576px", heiht: "230px", marginTop: "20px" }}>
            <img
              style={{ width: "576px", heiht: "230px" }}
              src="https://i.postimg.cc/x1yv3b2v/Annotation-2023-01-26-1717416.jpg"
              alt=""
            />
          </div>
        </div>

        <div>
          <img
            style={{ width: "576px", heiht: "542px" }}
            src="https://i.postimg.cc/g2TYQVL9/Annotation-2023-01-26-1717417.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default HomePage