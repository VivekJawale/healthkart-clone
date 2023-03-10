import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const LiveMeet = () => {
  const { id } = useParams();
  // console.log(id)
  const token = useSelector((store) => store.AuthReducer.token);
  const name = useSelector((store) => store.AuthReducer.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      swal({
        title: "Please Login First!",
        icon: "error",
      });
      navigate("/");
    }
  }, []);

  const myMeeting = async (element) => {
    // generate Kit Token
    const appID = 2047012227;
    const serverSecret = "caf99f37e2fc6b2e5695a58bc2773630";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      `${name}`
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default LiveMeet;
