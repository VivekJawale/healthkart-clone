import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import "./admincomponents/admin.css";
import "aos/dist/aos.css";
import AdminProductCard, {
  AdminproductCard,
} from "./admincomponents/AdminProductCard";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import AddNewProduct from "./admincomponents/AddNewProduct";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../Redux/store";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import AdminUserCard from "./admincomponents/AdminUserCard";
// const url=process.env.ApiUrl
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [data, setdata] = useState([]);
  const [filterTerm, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, SetTotalPages] = useState(41);
  const [sort, setSort] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((store) => store.AuthReducer.token);
  const [userData, setUserdata] = useState([]);
  const [UserChartdata, setUserChartData] = useState([]);

  // console.log(token)
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  if (token == "") {
    navigate("/");
    swal({
      title: "Not authorized!",
      text: "You are not authorized! Please contact devlopers",
      icon: "error",
    });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}check/checkrole`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    })
      .then((res) => {
        // console.log(res,"resjson")
        return res.json();
      })
      .then((res) => {
        if (res.msg == "Not Authorized") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/users`)
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (filterTerm == "") {
      setLoading(true);

      axios
        .get(`${process.env.REACT_APP_API_URL}product?limit=24&page=${page}`)
        .then((res) => {
          // console.log(res);
          setLoading(false);
          setdata(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      // console.log(filterTerm);
      setLoading(true);
      if (filterTerm == "whey") {
        SetTotalPages(2);
        // setPage(1)
      } else if (filterTerm == "prepostworkout") {
        SetTotalPages(7);
      } else if (filterTerm == "proteinfoods") {
        SetTotalPages(19);
      } else if (filterTerm == "weightmanagement") {
        SetTotalPages(10);
      } else if (filterTerm == "WheyProteinIsolate") {
        SetTotalPages(7);
      } else if (filterTerm == "gainers") {
        SetTotalPages(37);
      } else {
        SetTotalPages(3);
      }
      axios
        .get(
          `${process.env.REACT_APP_API_URL}product?limit=24&category=${filterTerm}&page=${page}&priceSort=${sort}`
        )
        .then((res) => {
          if (res.data == [] || res.data == undefined) {
            setPage(1);
          } else {
            setdata(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [filterTerm, page, sort]);

  useEffect(() => {
    let whey = 0;
    let gainer = 0;
    let preopost = 0;
    let pf = 0;
    let wm = 0;
    let wpi = 0;
    let we = 0;
    fetch(`${process.env.REACT_APP_API_URL}user/purchase`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res.forEach((el) => {
          if (el.orderCategory == "whey") {
            whey++;
          } else if (el.orderCategory == "gainers") {
            gainer++;
          } else if (el.orderCategory == "prepostworkout") {
            preopost++;
          } else if (el.orderCategory == "proteinfoods") {
            pf++;
          } else if (el.orderCategory == "weightmanagement") {
            wm++;
          } else if (el.orderCategory == "WheyProteinIsolate") {
            wpi++;
          } else {
            we++;
          }
        });

        setUserChartData([whey, gainer, preopost, pf, wm, wpi, we]);
      });
  }, []);

  const bARlabels = ["No. of products buyed as per caategory"];

  const pieCHartdata = {
    labels: [
      "Whey",
      "Gainers",
      "Pre-Post Workout",
      "Protein Foods",
      "Weight Management",
      "Whey Protein Isolate",
      "Workout Essential",
    ],
    datasets: [
      {
        label: "No. of Buyed product",
        data: UserChartdata,
        backgroundColor: [
          "red",
          "blue",
          "yellow",
          "green",
          "purple",
          "orange",
          "cyan",
        ],
        borderColor: [
          "red",
          "blue",
          "yellow",
          "green",
          "purple",
          "orange",
          "cyan",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isAdmin == false) {
    navigate("/");
    swal({
      title: "Not authorized!",
      text: "You are not authorized! Please contact devlopers",
      icon: "error",
    });
  }

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

      <div
        style={{
          margin: "auto",
          width: "95%",
          height: "50px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
      >
        <h1>USERS DATA</h1>
      </div>

      <div className="PieChart">
        <div data-aos="slide-right">
          <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
            Sales Data as per category of product
          </h1>
          <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>(Pie Chart)</h1>
        </div>
        <div data-aos="slide-left" style={{ background: "#fff" }}>
          <Pie data={pieCHartdata} />
        </div>
      </div>
      <div
        style={{
          margin: "auto",
          width: "95%",
          height: "50px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
      >
        <h1>ALL USERS DATA TABLE</h1>
      </div>

      <Table style={{ margin: "auto", width: "95%" }} striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((el) => {
            return <AdminUserCard el={el} key={el._id} />;
          })}
        </tbody>
      </Table>

      <div
        style={{
          margin: "auto",
          width: "95%",
          height: "50px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
      >
        <h1>PRODUCTS DATA</h1>
      </div>
      {filterTerm == "" ? (
        <div
          style={{
            width: "20%",
            height: "100px",
            marginLeft: "80%",
            display: "flex",
          }}
        >
          <Button
            style={{
              width: "200px",
              border: "none",
              height: "40px",
              background: "#0dccc5",
            }}
            onClick={() => setModalShow(true)}
          >
            Add New
          </Button>
          <AddNewProduct show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      ) : (
        <div
          style={{
            width: "30%",
            height: "100px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
          className="add_new_priduct_flex"
        >
          <Button
            style={{
              width: "200px",
              border: "none",
              height: "40px",
              background: "#0dccc5",
            }}
            onClick={() => setModalShow(true)}
          >
            Add New
          </Button>
          <AddNewProduct show={modalShow} onHide={() => setModalShow(false)} />
          <Form.Select
            style={{ width: "200px", border: "0.5 px #0dccc5", height: "40px" }}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option>Sort By</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Form.Select>
        </div>
      )}
      <div className="left_filter_admin">
        <div>
          {filterTerm == "" ? (
            <p>You can filter by category</p>
          ) : (
            <p>
              Filtered by : {filterTerm}{" "}
              <span
                onClick={() => {
                  setFilter("");
                  SetTotalPages(41);
                }}
                style={{ color: "0dccc5", marginLeft: "30px" }}
              >
                Reset
              </span>{" "}
            </p>
          )}
        </div>
        <div>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            Categories
          </h3>
        </div>
        {["radio"].map((type) => (
          <div
            key={`reverse-${type}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            className="mb-3 radiofilter"
          >
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
      <div
        style={{
          margin: "auto",
          width: "95%",
          height: "50px",
          fontWeight: "bold",
          marginTop: "40px",
        }}
      >
        <h1>ALL PRODUCTS DATA TABLE</h1>
      </div>
      <Table style={{ margin: "auto", width: "95%" }} striped responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>category</th>
            <th>Price</th>
            <th>Original Price</th>
            <th>Discount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return <AdminproductCard el={el} key={el._id} />;
          })}
        </tbody>
      </Table>

      <div className="admin_pagination">
        <Pagination style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <Pagination.First
            onClick={(e) => {
              setPage(1);
            }}
          />
          <Pagination.Prev
            onClick={(e) => {
              setPage(page == 1 ? page : page - 1);
            }}
          />
          <Pagination.Item
            onClick={(e) => {
              setPage(1);
            }}
          >
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item
            onClick={(e) => {
              setPage(page == 1 ? page : page - 1);
            }}
          >
            {page == 1 ? page : page - 1}
          </Pagination.Item>
          <Pagination.Item
            onClick={(e) => {
              setPage(page - 1);
            }}
            active
          >
            {page}
          </Pagination.Item>
          <Pagination.Item
            onClick={(e) => {
              setPage(page == totalPages ? page : page + 1);
            }}
          >
            {page == totalPages ? page : page + 1}
          </Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item
            onClick={(e) => {
              setPage(totalPages);
            }}
          >
            {totalPages}
          </Pagination.Item>

          <Pagination.Next
            onClick={(e) => {
              setPage(page == totalPages ? page : page + 1);
            }}
          />
          <Pagination.Last
            onClick={(e) => {
              setPage(totalPages);
            }}
          />
        </Pagination>
      </div>
    </>
  );
};

export default Admin;
