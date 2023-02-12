
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ImageMagnifier } from "./thumbnailcarousal";
import "./SingleProduct.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function SingleProduct() {

  const [loading, setLoading] = useState(false);
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
      console.log(data.product_colors.length);
    });
  }, [id]);
  
  console.log(data);

  const createarrofsize = (n) => {
    let arr = [];
    for (var i = 1; i <= n; i++) {
      arr.push(i);
    }
    console.log(arr);
  };

  const navigate = useNavigate();
  const [thumbsrc, setThumbsrc] = useState(
    `https://cdn.shopify.com/s/files/1/0906/2558/products/BeginnersEssentialsCombo3-WBGimages.jpg?v=1630683820`
  );

  const thumbnails = [
    `${data.image}`
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div id="add_div"></div>
      <div className="breadcrumbs1">
        <span
          style={{ color: "gray", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <svg
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
          focusable="false"
          width="25"
          fill="gray"
          height="30"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="KeyboardArrowRightIcon"
        >
          <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
        </svg>
        <span style={{ fontWeight: "bold" }}>{data.name}</span>
      </div>

      {/* ------------------------------------------------------thumbnail carousel----------------------------------------------- */}

      <div className="description_data">
        <div style={{ width: "492px", height: "1296px" }}>
          <div
            style={{
              width: "492px",
              height: "370px",
              display: "flex",
              top: "0",
            }}
          >
            <div
              style={{
                width: "119px",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
            >
              {thumbnails.map((el) => {
                return (
                  <div
                    id={el}
                    style={{
                      width: "74px",
                      height: "74px",
                      borderRadius: "12px",
                      margin: "3px 12px",
                    }}
                    onMouseOver={() => {
                      setThumbsrc(el);
                      document.getElementById(el).style.border = "2px solid";
                    }}
                  >
                    <img
                      src={el}
                      alt=""
                      style={{ width: "50px", height: "68px" }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              style={{
                width: "361px",
                height: "363px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e4e4e4",
                borderRadius: "12px",
              }}
            >
              <ImageMagnifier width={"248px"} height={"337px"} src={thumbsrc} />
            </div>
          </div>
        </div>

        {/* --------------------------------------------title and price right side start--------------------------------- */}

        <div
          style={{
            width: "683px",
            height: "1256px",
            dispaly: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "683px",
                height: "23px",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "649px",
                  height: "23px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <span style={{ color: "#212121", fontSize: "20px" }}>
                  {data.name}
                </span>
              </div>
              <div style={{ width: "24px", height: "23px" }}>
                <svg
                  onClick={() => {
                    swal({
                      icon: "info",
                      text: "Not Available For Now!",
                      buttons: false,
                    });
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  cursor="pointer"
                  height="20"
                  fill="#757575"
                  viewBox="0 0 448 512"
                >
                  <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                </svg>
              </div>
            </div>

            <div
              style={{
                width: "683px",
                height: "18px",
                display: "flex",
                marginTop: "5px",
                alignItems: "center",
                justifyContent: "left",
                marginLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "#212121",
                  fontWeight: "normal",
                }}
              >
                ₹{data.price}
                <span style={{ color: "#FC2779", fontSize: "14px" }}>
                  ( 20% Off)
                </span>
              </span>
            </div>
          </div>
            {/* --------------------------------------accordian------------------------------------------- */}

            <div style={{ width: "683px", height: "245px" }}>
              <Accordion flush style={{ width: "683px", height: "245px" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>DESCRIPTION</Accordion.Header>
                  <Accordion.Body>{data.description}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>HOW TO APPLY</Accordion.Header>
                  <Accordion.Body>{data.description}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>INGREDIENTS</Accordion.Header>
                  <Accordion.Body>
                    {data.tag_list == null ? (
                      <p>No info</p>
                    ) : (
                      data.tag_list.map((el) => {
                        return <p>{el}</p>;
                      })
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>COMMONLY ASKED QUESTIONS</Accordion.Header>
                  <Accordion.Body>N.A.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>REVIEWS</Accordion.Header>
                  <Accordion.Body>0 Reviews</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>

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
              src={data.api_featured_image}
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
                ₹{data.price}
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