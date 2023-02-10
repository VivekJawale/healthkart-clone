import axios from 'axios';
import React from 'react'
import swal from 'sweetalert';
import { AdminUserChart } from './AdminUserChart';

const AdminUserCard = ({el}) => {
    const [modalShow, setModalShow] = React.useState(false);
    
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
              .delete(`${process.env.REACT_APP_API_URL}user/${el._id}`)
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

  return (
    <>
     <tr>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.gender}</td>
            <td>{el.role}</td>
            <td className="delete" onClick={handleDelete} >Delete</td>
          </tr>
    </>
  )
}

export default AdminUserCard