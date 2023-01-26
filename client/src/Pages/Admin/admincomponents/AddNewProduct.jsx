import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const AddNewProduct = (props) => {
  //   const {el}=props;
  // console.log(el);
  // console.log(el)
  const [category, setnewCategory] = useState("whey");
  const [image_url, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [discountPrice, setDiscountprice] = useState("");
  const [ogprice, setogprice] = useState("");
  //   const [bold,setBold]=useState(el.bold);
  const [offer, setOffer] = useState("");
  //   const [boldavail,notbold]=React.useState();

  const handlechanges = ({ props }) => {
    let data_to_add = {
      name: name,
      image: image_url,
      price1: discountPrice,
      price2: ogprice,
      discount: offer,
      quantity: 3,
      category: category,
      reviews: [],
      ratings: [],
      star_rating: "",
    };

    if (
      image_url == "" ||
      name == "" ||
      discountPrice == "" ||
      ogprice == "" ||
      offer == ""
    ) {
      return swal({
        title: "All fields needs to be filled!",
        icon: "warning",
      });
    }

    swal({
      title: "Are you sure?",
      text: "Please check details before you add product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`https://lime-fawn-veil.cyclic.app/product`, data_to_add)
          .then((res) => {
            console.log(res);
            if (res.data) {
              swal("Product has been added to Database", {
                icon: "success",
              });
              console.log(props.onHide());
            }
          })
          .catch((err) => {
            swal("Product adding failed! ", {
              icon: "error",
            });
            console.log(err);
          });
      } else {
      }
    });
  };

  return (
    <Modal
      {...props}
      size="lg md sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{marginTop:"50px",paddingBottom:"50px"}}
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            borderBottom: "none",
            fontFamily: "Trebuchet MS',sans-serif",
            color: "#424040",
          }}
          id="contained-modal-title-vcenter"
        >
          <span style={{ marginRight: "20px" }}></span>Add New Product to
          Database
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "25rem" }}>
          <Card.Body>
            <p>PREVIEW OF CURRENT IMAGE URL</p>
          </Card.Body>
          <Card.Img variant="top" src={image_url} />
          <Card.Body>
            <p>ADD NEW IMAGE URL.</p>
            <input
              type="text"
              style={{
                width: "100%",
                overflow: "scroll",
                background: "#eee",
                padding: "5px 5px",
              }}
              placeholder={image_url}
              value={image_url}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
            <p style={{ marginTop: "5px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>
                Preview of entered URL:-
              </span>{" "}
              {image_url}
            </p>
          </Card.Body>
          <Card.Body>
            <p>ADD PRODUCT NAME</p>
            <input
              type="text"
              style={{
                width: "100%",
                overflowX: "scroll",
                background: "#eee",
                padding: "5px 5px",
              }}
              placeholder={name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <p style={{ marginTop: "5px" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>
                Preview of entered Name:-
              </span>{" "}
              {name}
            </p>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item style={{ display: "flex" }}>
              <div
                style={{
                  background: "#2eb8b8",
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "3px",
                }}
              >
                <p style={{ fontSize: "15px", color: "white" }}>N.A</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <span style={{ padding: "5px 5px" }}>₹</span>
                <input
                  type="text"
                  style={{
                    width: "20%",
                    overflowX: "scroll",
                    background: "#eee",
                    padding: "5px 5px",
                  }}
                  placeholder={discountPrice}
                  value={discountPrice}
                  onChange={(e) => {
                    setDiscountprice(e.target.value);
                  }}
                />
                <span style={{ padding: "5px 5px" }}>
                  Add Discounted Price.
                </span>
              </div>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <span style={{ padding: "5px 5px" }}>₹</span>
                <input
                  type="text"
                  style={{
                    width: "20%",
                    overflowX: "scroll",
                    background: "#eee",
                    padding: "5px 5px",
                  }}
                  placeholder={ogprice}
                  value={ogprice}
                  onChange={(e) => {
                    setogprice(e.target.value);
                  }}
                />{" "}
                <span style={{ padding: "5px 5px" }}>Add original Price.</span>
              </div>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <input
                  type="text"
                  style={{
                    width: "20%",
                    overflowX: "scroll",
                    background: "#eee",
                    padding: "5px 5px",
                  }}
                  placeholder={offer}
                  value={offer}
                  onChange={(e) => {
                    setOffer(e.target.value);
                  }}
                />{" "}
                <span style={{ padding: "5px 5px" }}>
                  Add discount in % off{" "}
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>
                  Select Category :-{" "}
                  <span style={{ marginRight: "20px", fontWeight: "normal" }}>
                    {category}
                  </span>{" "}
                </p>
              </div>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                value={category}
                onChange={(e) => {
                  setnewCategory(e.target.value);
                }}
              >
                <option>select menu to select new category</option>
                <option value="whey">Whey</option>
                <option value="gainers">Gainers</option>
                <option value="prepostworkout">Pre-Post Workout</option>
                <option value="proteinfoods">Protein Foods</option>
                <option value="Weight Management">Weight Management</option>
                <option value="WheyProteinIsolate">Whey Protein Isolate</option>
                <option value="workoutessential">Workout Essential</option>
              </Form.Select>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handlechanges}>
          Add New
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewProduct;
