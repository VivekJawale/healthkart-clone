import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { Box, CardBody, Icon, Image, Text } from "@chakra-ui/react";
import { BiHeart } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import AdminProductEdit from "./AdminProductEdit";
import { useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";

export const AdminproductCard = ({ el }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [bold, notbold] = React.useState();

  useEffect(() => {
    if (el.bold) {
      notbold(true);
    } else {
      notbold(false);
    }
  }, []);

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this product! changes are irreversible!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //
        axios
          .delete(`https://lime-fawn-veil.cyclic.app/product/${el._id}`)
          .then((res) => {
            if (res.data) {
              swal({
                title: "Deleted successfully!",
                icon: "success",
              });
              window.location.reload();
            }
          })
          .catch((err) => {
            swal({
              title: "Delete failed",
              icon: "error",
            });
            console.log(err);
          });
      } else {
      }
    });
  };

  // console.log(el.bold);
  return (
    <>
      <Card
        style={{
          border: "0px solid #C8C8C8",
          rounded: "5px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: "10px 10px",
          width: "22rem",
          height: "600px",
          paddingBottom: "20px",
        }}
      >
        <Card.Img variant="top" src={el.image} width="60%" height="60%" />
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
          <p style={{ fontSize: "15px", color: "white" }}>
            {el.star_rating == undefined ? "N.A" : el.star_rating}
          </p>
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

        <Card.Body>
          <Card.Title>{el.name}</Card.Title>
        </Card.Body>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ display: "flex" }}>
            <span contentEditable="false">₹ {el.price1}</span>
          </div>

          <div style={{ display: "flex" }}>
            <span
              style={{ textDecoration: "line-through" }}
              contentEditable="false"
            >
              ₹ {el.price2}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <span style={{ color: "green" }} contentEditable="false">
              {el.discount} % off
            </span>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "10px",
          }}
        >
          <Button
            variant="warning"
            style={{ width: "40%" }}
            onClick={() => setModalShow(true)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ width: "40%" }}
          >
            Delete
          </Button>{" "}
        </div>
      </Card>
      <AdminProductEdit
        el={el}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
