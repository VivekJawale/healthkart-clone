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
        {/* onClick={() => setModalShow(true)} */}
        <tr >
            <td><img style={{width:"60%",height:"100px"}} src={el.image}/></td>
            <td><div><p>{el.name}</p></div></td>
            <td>{el.category}</td>
            <td>{el.price1}</td>
            <td>{el.price2}</td>
            <td>{el.discount}</td>
            <td className="edit" onClick={() => {setModalShow(true)}}>Edit</td>
            <td className="delete" onClick={()=>{handleDelete()}} >Delete</td>
          </tr>
      <AdminProductEdit
        el={el}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
