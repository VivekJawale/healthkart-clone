import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LoginCarousel } from "./LoginCarousal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { useState } from "react";
import "./login.css";
import { authentification } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import swal from "sweetalert";
import { postLoginSuccess } from "../../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";

export const LoginModal = (props) => {
  const [otpentry, setOtpentry] = useState(false);
  const [signup, setSignup] = useState(false);
  const [otp, setOtp] = useState("");
  const [mnumber, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const checkrecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentification
    );
  };

  const Requestotp = () => {
    if (mnumber.length != 10) {
      return swal({
        title: "You entered wrong mobile number",
        text: "It must be 10 digit number",
        icon: "warning",
      });
    }
    setLoading(true);

    //   setOtpentry(true);
    // return  setSignup(false);

    let phoneNumber = `+91${mnumber}`;

    checkrecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentification, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          title: "OTP Sent !",
          text: `OTP successfully sent on ${phoneNumber}`,
          icon: "success",
          button: "OK",
        });
        setOtpentry(true);
        setSignup(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setOtpentry(false);
        setSignup(false);
        setLoading(false);
        swal({
          title: "Error in Sending OTP",
          text: "Please check Entered Mobile Number or try after some time",
          icon: "error",
          button: "OK",
        });
      });
  };

  const Verifyotp = async () => {
    if (otp.length != 6) {
      return swal({
        title: "You entered wrong OTP",
        text: "It must be 6 digit number",
        icon: "warning",
      });
    }
    let mnumber_to_num = Number(mnumber);
    let payload = {
      phoneNumber: mnumber_to_num,
    };
    await fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        //  console.log(res)
        return res.json();
      })
      .then((res) => {
        //  console.log(res)

        setLoading(true);

        let confirmationResult = window.confirmationResult;

        confirmationResult
          .confirm(otp)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            swal({
              title: "Mobile Number Verified",
              text: `+91${mnumber} is successfully verified`,
              icon: "success",
              buttons: false,
            });
            // console.log(res.message)
            if (res.msg == "new user") {
              setSignup(true);
              setOtpentry(false);
              setLoading(false)
            } else {
              dispatch(postLoginSuccess(res));
              setSignup(false);
              setOtpentry(false);
              setLoading(false)
              props.onHide();
            }
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            setLoading(false);
            swal({
              title: "Wrong OTP !",
              text: "Entered OTP is wrong, please enter correct OTP",
              icon: "error",
              button: "OK",
            });
          });
      });
    // setOtpentry(false);
    // setSignup(true)
  };

  const signupFunction = async () => {
    if (name == "" || email == "" || pass == "") {
      return swal({
        title: "Please fill all the fields!",
        text: "all fields must be filled",
        icon: "warning",
      });
    }
    let mnumber_to_num = Number(mnumber);
    let payload = {
      name: name,
      email: email,
      password: pass,
      phoneNumber: mnumber_to_num,
      gender: gender,
      role: "Guest",
    };
    setLoading(true)
    await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        //  console.log(res)
        return res.json();
      })
      .then((res) => {
        if (res.msg == "Logged in success") {
          setSignup(false);
          setOtpentry(false);
          setLoading(false)
          dispatch(postLoginSuccess(res));
          props.onHide();
          swal({
            title: "Signed up successfully!",
            text: `Login successfull, Hi, ${name}`,
            icon: "success",
          });
        } else {
          swal({
            title: " registration failed",
          });
          setLoading(false)
          setOtpentry(false);
          setSignup(false);
        }
      });
  };

  return (
    <>
      <Modal
        {...props}
        centered
        size="xl"
        className="my-modal"
        style={{ background: "transparent", marginTop: "30px" }}
      >
        <div className="main_login_div">
          <div className="main_login_div_upper">
            <div
              style={{
                width: "50%",
                height: "50px",
                borderTopLeftRadius: "12px",
              }}
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
              height="20"
              fill="gray"
              onClick={props.onHide}
              style={{ cursor: "pointer", marginRight: "20px" }}
            >
              <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
            </svg>
          </div>

          <div className="main_login_div_lower">
            <div className="left_login_div">
              <LoginCarousel />
            </div>
            <div className="right_login_div">
              {otpentry == false && signup == false ? (
                <div
                  style={{
                    height: "242.8px",
                    fontFamily: "Montserrat,sans-serif",
                  }}
                  className="requestotp_div"
                >
                  <div
                    style={{
                      width: "415px",
                      height: "36px",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      letterSpacing: "normal",
                      margin: "0px 0px 32px",
                      color: "#1C1C28",
                    }}
                  >
                    <p>Login or Sign-up</p>
                  </div>
                  <div
                    style={{
                      width: "415px",
                      height: "51px",
                      color: "#1c1c28",
                      fontWeight: "bold",
                    }}
                  >
                    <InputGroup className="mb-3" style={{ width: "89%" }}>
                      <Button
                        style={{
                          color: "#1c1c28",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "27px",
                          letterSpacing: "normal",
                          height: "51px",
                          border: "1px solid #dbdee9",
                          borderRadius: "8px 0px 0px 8px",
                        }}
                        variant="outline-secondary"
                        id="button-addon1"
                      >
                        +91
                      </Button>
                      <Form.Control
                        style={{
                          color: "#1c1c28",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: "27px",
                          letterSpacing: "normal",
                          height: "51px",
                          border: "1px solid #dbdee9",
                          borderRadius: "0 8px 8px 0",
                          padding: "25.5px 16px",
                        }}
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        value={mnumber}
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div
                    style={{
                      width: "415px",
                      height: "100px",
                      margin: "0px 0px 32px",
                    }}
                  >
                    {loading ? (
                      <button className="signup_modal_btns" disabled>
                        Get OTP
                      </button>
                    ) : (
                      <button
                        className="signup_modal_btns"
                        onClick={Requestotp}
                      >
                        Get OTP
                      </button>
                    )}
                    <p
                      style={{
                        color: "#A4A4A9",
                        width: "90%",
                        fontSize: "13px",
                        marginTop: "16px",
                      }}
                    >
                      *You may receive SMS updates from Healthkart and can opt
                      out at any time.
                    </p>
                  </div>
                </div>
              ) : otpentry == true && signup == false ? (
                <div
                  style={{
                    height: "242.8px",
                    fontFamily: "Montserrat,sans-serif",
                  }}
                  className="verifyotp_div"
                >
                  <div
                    style={{
                      width: "415px",
                      height: "60px",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      letterSpacing: "normal",
                      margin: "0px 0px 32px",
                      color: "#1C1C28",
                    }}
                  >
                    <p>Enter verification code</p>
                    <p
                      style={{
                        color: "#A4A4A9",
                        fontWeight: "light",
                        width: "90%",
                        fontSize: "13px",
                        marginTop: "0px",
                      }}
                    >
                      OTP sent to number
                    </p>
                  </div>
                  <InputGroup className="mb-3" style={{ width: "89%" }}>
                    <Form.Control
                      style={{
                        color: "#1c1c28",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "27px",
                        letterSpacing: "normal",
                        height: "51px",
                        border: "1px solid #dbdee9",
                        borderRadius: "0 8px 8px 0",
                        padding: "25.5px 16px",
                      }}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </InputGroup>

                  <p
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      width: "90%",
                      fontSize: "14px",
                      textAlign: "right",
                      marginTop: "20px",
                    }}
                  >
                    RESEND OTP
                  </p>
                  <div
                    style={{
                      width: "415px",
                      height: "100px",
                      margin: "0px 0px 32px",
                    }}
                  >
                    {loading ? (
                      <button className="signup_modal_btns" disabled>
                        Continue
                      </button>
                    ) : (
                      <button className="signup_modal_btns" onClick={Verifyotp}>
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "475px",
                    height: "242.8px",
                    fontFamily: "Montserrat,sans-serif",
                  }}
                  className="signup_div"
                >
                  <div
                    style={{
                      width: "415px",
                      height: "60px",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      letterSpacing: "normal",
                      margin: "0px 0px 0px",
                      color: "#1C1C28",
                    }}
                  >
                    <p>Sign Up</p>
                  </div>

                  <InputGroup className="mb-3" style={{ width: "89%" }}>
                    <Form.Control
                      style={{
                        color: "#1c1c28",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "27px",
                        letterSpacing: "normal",
                        height: "51px",
                        border: "1px solid #dbdee9",
                        borderRadius: "0 8px 8px 0",
                        padding: "25.5px 16px",
                      }}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      placeholder="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{ width: "89%" }}>
                    <Form.Control
                      style={{
                        color: "#1c1c28",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "27px",
                        letterSpacing: "normal",
                        height: "51px",
                        border: "1px solid #dbdee9",
                        borderRadius: "0 8px 8px 0",
                        padding: "25.5px 16px",
                      }}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      placeholder="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{ width: "89%" }}>
                    <Form.Control
                      style={{
                        color: "#1c1c28",
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "27px",
                        letterSpacing: "normal",
                        height: "51px",
                        border: "1px solid #dbdee9",
                        borderRadius: "0 8px 8px 0",
                        padding: "25.5px 16px",
                      }}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      placeholder="password"
                      value={pass}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{ width: "89%" }}>
                    <Form.Check
                      inline
                      label="Male"
                      name="group1"
                      type="radio"
                      onChange={() => {
                        setGender("Male");
                      }}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      value={"Female"}
                      onChange={() => {
                        setGender("Female");
                      }}
                    />
                    <Form.Check
                      inline
                      label="Others"
                      type="radio"
                      value={""}
                      onChange={() => {
                        setGender("Others");
                      }}
                    />
                  </InputGroup>

                  <div
                    style={{
                      width: "415px",
                      height: "100px",
                      margin: "0px 0px 32px",
                    }}
                  >
                    {loading ? (
                      <button className="signup_modal_btns" disabled>
                        Sign Up
                      </button>
                    ) : (
                      <button
                        className="signup_modal_btns"
                        onClick={signupFunction}
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <div id="recaptcha-container"></div>
    </>
  );
};
