import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
// http://localhost:8080/buy/purchase

// "_id": "63e3504aa67d4657ba2a3742",
// "name": "Vivek",
// "orderCategory": "prepostworkout",
// "userid": "63e333484fb25774d5cd336e",
// "createdAt": "2023-02-08T07:33:30.513Z",
// "updatedAt": "2023-02-08T07:33:30.513Z"
export const AdminUserChart=(props)=>{
    const {el}=props;
    const [Userdata,setUserData]=useState([]);


    useEffect(()=>{
        let whey=0;let gainer=0;let preopost=0; let pf=0;let wm=0;let wpi=0;let we=0;
        fetch(`${process.env.REACT_APP_API_URL}buy/purchase`).then((res)=>{
           return res.json();
        }).then((res)=>{
           
           let filtered=res.filter((item)=>{
            console.log(el,"el",item,"item");
               return item.userid==el._id
            })
            console.log(filtered,"filtered")
            res.forEach((el)=>{
                if(el.orderCategory=="whey"){
                    whey++;
                }
                else if(el.orderCategory=="gainers"){
                    gainer++;
                }
                else if(el.orderCategory=="prepostworkout"){
                    preopost++;
                }
                else if(el.orderCategory=="proteinfoods"){
                    pf++;
                }
                else if(el.orderCategory=="weightmanagement"){
                    wm++;
                }
                else if(el.orderCategory=="WheyProteinIsolate"){
                    wpi++;
                }
                else{
                    we++;
                }
            })

            // setUserData([whey,gainer,preopost,pf,wm,wpi,we]);
            // console.log(Userdata)
        })
    },[])





    const data = {
  labels: ["Whey", "Gainers", "Pre-Post Workout", "Protein Foods", "Weight Management", "Whey Protein Isolate", "Workout Essential"],
  datasets: [
    {
      label: "No. of Buyed product",
      data: Userdata,
      backgroundColor: [
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        "cyan"
      ],
      borderColor: [
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        "cyan"
      ],
      borderWidth: 1
    }
  ]
};

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User's spending data as per category.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body   >
     
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
