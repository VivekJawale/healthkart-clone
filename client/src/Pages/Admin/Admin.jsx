import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import "./admincomponents/admin.css";
import "aos/dist/aos.css";
import AdminProductCard, {
  AdminproductCard,
} from "./admincomponents/AdminProductCard";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import Placeholder from 'react-bootstrap/Placeholder';
import AddNewProduct from "./admincomponents/AddNewProduct";
import Navbar from "../Navbar";
// const url=process.env.ApiUrl

const Admin = () => {
 
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setdata] = useState([]);
  const [filterTerm, setFilter] = useState("");
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalPages,SetTotalPages]=useState(41);
  const [sort,setSort]=useState("");


  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (filterTerm == "") {
      setLoading(true);
    
      axios
        .get(`https://lime-fawn-veil.cyclic.app/product?limit=24&page=${page}`)
        .then((res) => {
          // console.log(res);
          setLoading(false);
            setdata(res.data);

         
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    } else {
      // console.log(filterTerm);
      setLoading(true);
      if(filterTerm=="whey"){
        SetTotalPages(2);
        // setPage(1)
      }
      else if(filterTerm=="prepostworkout"){
        SetTotalPages(7);
      }
      else if(filterTerm=="proteinfoods"){
        SetTotalPages(19);
      }
      else if(filterTerm=="weightmanagement"){
        SetTotalPages(10)
      }
      else if(filterTerm=="WheyProteinIsolate"){
        SetTotalPages(7)
      }
      else if(filterTerm=="gainers"){
        SetTotalPages(37)
      }
      else{
        SetTotalPages(3)
      }
      axios
        .get(
          `https://lime-fawn-veil.cyclic.app/product?limit=24&category=${filterTerm}&page=${page}&priceSort=${sort}`
        )
        .then((res) => {
          if(res.data==[] || res.data==undefined){
             setPage(1)
          }
          else{
            setdata(res.data);
            setLoading(false)
          }
         
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }
  }, [filterTerm,page,sort]);

  return (
    <>
    {/* <Navbar /> */}
      <div className="welcome_admin">
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div className="welcome_message">
          <h1>WELCOME TO ADMIN PANEL</h1>
          <img
            style={{ width: "100px", height: "100px" }}
            src="https://content.invisioncic.com/p289038/monthly_2020_05/Bounce-arrow.gif.ab5ac6f311d13c20c4a6d256178344bf.gif"
            alt=""
          />
        </div>
      </div>

      <div className="what_and_how">
        <div data-aos="slide-right">
          <h1>What you can do ?</h1>
          <p>Edit, Delete and Stock availability</p>
        </div>
        <div data-aos="slide-left">
          <h1>How you can do ?</h1>
          <p>Look for product you want to change and change it.</p>
        </div>
      </div>
     
     {filterTerm==""?
     <div style={{width:"20%",height:"100px",marginLeft:"80%",display:"flex"}}>
       <Button style={{width:"200px",border:"none",height:"40px",background:"#0dccc5"}} onClick={() => setModalShow(true)} >Add New</Button>
      <AddNewProduct show={modalShow} onHide={() => setModalShow(false)}/>
     </div>
     :<div style={{width:"30%",height:"100px",display:"flex",justifyContent:"space-evenly"}} className="add_new_priduct_flex">
       <Button style={{width:"200px",border:"none",height:"40px",background:"#0dccc5"}} onClick={() => setModalShow(true)} >Add New</Button>
      <AddNewProduct show={modalShow} onHide={() => setModalShow(false)}/>
     <Form.Select style={{width:"200px",border:"0.5 px #0dccc5",height:"40px"}} value={sort} onChange={(e)=>{setSort(e.target.value)}} aria-label="Default select example">
      <option>Sort By</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </Form.Select>
     </div>}

      <div className="all_products_main">
        <div className="left_filter_admin">
          <div>
           {filterTerm==""?<p>You can filter by category</p>:<p>Filtered by : {filterTerm} <span onClick={()=>{setFilter("");SetTotalPages(41)}} style={{color:"0dccc5",marginLeft:"30px"}}>Reset</span> </p>}
          </div>
          <div>
            <h3 style={{fontWeight:"bold",fontSize:"18px",marginTop:"10px",marginBottom:"5px"}}>Categories</h3>
          </div>
          {["radio"].map((type) => (
            <div key={`reverse-${type}`} style={{height:"250px",display:"flex",alignItems:"flex-start",justifyContent:"space-evenly",flexDirection:"column"}} className="mb-3">
              <Form.Check
                label="Whey"
                name="group1"
                type={type}
                value="whey"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <Form.Check
                label="Gainers"
                name="group1"
                type={type}
                id={`reverse-${type}-2`}
                value="gainers"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
               <Form.Check
                label="Pre-Post Workout"
                name="group1"
                type={type}
                id={`reverse-${type}-3`}
                value="prepostworkout"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
               <Form.Check
                label="Protein Foods"
                name="group1"
                type={type}
                id={`reverse-${type}-4`}
                value="proteinfoods"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
               <Form.Check
                label="Weight Management"
                name="group1"
                type={type}
                id={`reverse-${type}-5`}
                value="weightmanagement"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
               <Form.Check
                label="Whey Protein Isolate"
                name="group1"
                type={type}
                id={`reverse-${type}-6`}
                value="WheyProteinIsolate"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
               <Form.Check
                label="Workout Essential"
                name="group1"
                type={type}
                id={`reverse-${type}-6`}
                value="workoutessentials"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
            </div>
          ))}
        </div>
        <div className="right_filter_admin">
          <Row xs={1} md={2} lg={3} className="g-4">
            {data && loading?[1,2,3,4,5,6,7,8,9].map((el)=>{
              return(
              <Card style={{ width: '22rem',height:"600px",display:"flex",justifyContent:"space-evenly",flexDirection:"column" }}>
            <Card.Img  width="60%" height="60%" variant="top" src="https://www.gqrhealthapp.com/Resources/images/rolling.gif" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={3} size="lg" />
              </Placeholder>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={12} size="lg" /> 
                <Placeholder xs={12} size="lg" /> 
              </Placeholder>
              <Placeholder as={Card.Text} style={{display:"flex",justifyContent:"space-evenly",marginTop:"30px"}} animation="glow">
            <Placeholder xs={3} /> <Placeholder xs={3} /> <Placeholder xs={3} />{' '}
          </Placeholder >
          <div style={{display:"flex",justifyContent:"space-evenly",marginTop:"30px"}}>
              <Placeholder.Button variant="warning" xs={5} />
              <Placeholder.Button variant="danger" xs={5} />
              </div>
            </Card.Body>
          </Card>)
            })       
            :
              data.map((el) => (
                <Col>
                  <AdminproductCard key={el._id}  el={el} />
                </Col>
              ))}
          </Row>
        </div>
      </div>

      <div className="admin_pagination">
      <Pagination style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      <Pagination.First onClick={(e)=>{setPage(1)}}  />
      <Pagination.Prev onClick={(e)=>{setPage(page==1?page:page-1)}} />
      <Pagination.Item onClick={(e)=>{setPage(1)}}>{1}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={(e)=>{setPage(page==1?page:page-1)}}>{page==1?page:page-1}</Pagination.Item>
      <Pagination.Item onClick={(e)=>{setPage(page-1)}} active>{page}</Pagination.Item>
      <Pagination.Item onClick={(e)=>{setPage(page==totalPages?page:page+1)}}>{page==totalPages?page:page+1}</Pagination.Item>
      <Pagination.Ellipsis />
      
      <Pagination.Item onClick={(e)=>{setPage(totalPages)}}>{totalPages}</Pagination.Item>
     
      <Pagination.Next onClick={(e)=>{setPage(page==totalPages?page:page+1)}} />
      <Pagination.Last onClick={(e)=>{setPage(totalPages)}} />
    </Pagination>

      </div>

    </>
  );
};

export default Admin;
