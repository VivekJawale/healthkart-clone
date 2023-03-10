import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./meet.css"

const EnterRoom = () => {
  const [value, setValue] = useState("");

  const token = useSelector((store) => store.AuthReducer.token);
  const name = useSelector((store) => store.AuthReducer.name);
  const navigate = useNavigate();

  const handleAdd = async () => {
    await fetch("http://localhost:8080/sendmail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ link: `http://localhost:3000/meet/${value}` }),
    }).then((res) => {
      if (res) {
        swal({
          title: "Invitation sent to our trainer",
          text: "Please wait while instructor will join",
          icon: "success",
        });
      }
    });
    navigate(`/meet/${value}`);
  };

  useEffect(() => {
    if (token == undefined || token == "") {
      swal({
        title: "Please login first",
        icon: "error",
      });
      navigate("/");
    } else {
    }
  }, []);

  return (
    <div className="roomentering">
        <div className="room_mini_div">
        <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Enter random unique number"
      />
      <button onClick={handleAdd}>Enter room</button>
        </div>
     
    </div>
  );
};

export default EnterRoom;
