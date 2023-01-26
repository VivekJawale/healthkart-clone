import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LoginCarousel } from './LoginCarousal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { PinInput, PinInputField,HStack } from '@chakra-ui/react'
import { useState } from 'react';
import "./login.css"


export const LoginModal=(props)=> {
    const [otpentry,setOtpentry]=useState(false);
    const [signup,setSignup]=useState(false);
    const [otp,setOtp]=useState("");

    const Requestotp=()=>{
          setOtpentry(true);
          setSignup(false)
    }

    const Verifyotp=()=>{
        console.log(otp)
        setOtpentry(false);
        setSignup(true)
    }

  return (
    <Modal
      {...props}
      centered
      size="xl"
      className="my-modal"
      style={{background:"transparent"}}
    >
        <div className ="main_login_div">
        <div className="main_login_div_upper">
        <div style={{width:"50%",height:"50px",borderTopLeftRadius:"12px"}}></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
            fill="gray"
            onClick={props.onHide}
            style={{cursor:"pointer",marginRight:"20px"}}
          >
            <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
          </svg>
        </div>

        <div className="main_login_div_lower">
          <div className="left_login_div">
            <LoginCarousel/>
          </div>
          <div className="right_login_div">
           {otpentry==false&&signup==false?<div style={{height:"242.8px",fontFamily: "Montserrat,sans-serif"}} className="requestotp_div">
            <div style={{width:"415px",height:"36px",fontSize:"24px",fontWeight: "600",lineHeight: "36px",letterSpacing: "normal",margin:"0px 0px 32px",color:"#1C1C28"}}>
            <p>Login or Sign-up</p>
            </div>
            <div style={{width:"415px",height:"51px",color:"#1c1c28",fontWeight:"bold"}}>
            <InputGroup className="mb-3" style={{width:"89%"}}>
        <Button  style={{color:"#1c1c28",fontSize: "16px",fontWeight: "500",lineHeight: "27px",letterSpacing: "normal",height:"51px",border: "1px solid #dbdee9",borderRadius: "8px 0px 0px 8px"}} variant="outline-secondary" id="button-addon1">
          +91
        </Button>
        <Form.Control
        style={{color:"#1c1c28",fontSize: "16px",fontWeight: "500",lineHeight: "27px",letterSpacing: "normal",height:"51px",border: "1px solid #dbdee9",borderRadius: "0 8px 8px 0",padding: "0 16px"}}
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
            </div>
<div style={{width:"415px",height:"100px",margin:"0px 0px 32px"}}>
<button className="signup_modal_btns"  onClick={Requestotp}>Get OTP</button>
<p style={{color:"#A4A4A9",width:"90%",fontSize:"13px",marginTop:"16px"}}>*You may receive SMS updates from Healthkart and can opt out at any time.</p>
</div>


            </div>
:(otpentry==true&&signup==false?
            <div style={{height:"242.8px",padding:"0px 0px 0px 60px",fontFamily: "Montserrat,sans-serif"}} className="verifyotp_div">
            <div style={{width:"415px",height:"60px",fontSize:"24px",fontWeight: "600",lineHeight: "36px",letterSpacing: "normal",margin:"0px 0px 32px",color:"#1C1C28"}}>
            <p>Enter verification code</p>
            <p style={{color:"#A4A4A9",fontWeight:"light",width:"90%",fontSize:"13px",marginTop:"0px"}}>OTP sent to number</p>
            </div>
          
            <HStack style={{width:"80%"}}>
            <PinInput value={otp} onChange={(e)=>{setOtp(e)}} size="lg" >
  <PinInputField style={{border:"1px solid #dbdee9"}} />
  <PinInputField style={{border:"1px solid #dbdee9"}}/>
  <PinInputField style={{border:"1px solid #dbdee9"}}/>
  <PinInputField style={{border:"1px solid #dbdee9"}}/>
  <PinInputField style={{border:"1px solid #dbdee9"}}/>
  <PinInputField style={{border:"1px solid #dbdee9"}}/>
</PinInput></HStack>
<p style={{color:"orange",fontWeight:"bold",width:"90%",fontSize:"14px",textAlign:"right",marginTop:"20px"}}>RESEND OTP</p>
<div style={{width:"415px",height:"100px",margin:"0px 0px 32px"}}>
<button className="signup_modal_btns"  onClick={Verifyotp}>Continue</button>
</div>
    </div>:
     <div style={{width:"475px",height:"242.8px",padding:"0px 0px 0px 60px",fontFamily: "Montserrat,sans-serif"}} className="signup_div">
     <div style={{width:"415px",height:"60px",fontSize:"24px",fontWeight: "600",lineHeight: "36px",letterSpacing: "normal",margin:"0px 0px 32px",color:"#1C1C28"}}>
     <p>Sign Up</p>
     <p style={{color:"#A4A4A9",fontWeight:"light",width:"90%",fontSize:"13px",marginTop:"0px"}}>OTP sent to number</p>
     </div>
   
     <HStack style={{width:"80%"}}>
     <PinInput   size="lg" >
<PinInputField style={{border:"1px solid #dbdee9"}} />
<PinInputField style={{border:"1px solid #dbdee9"}}/>
<PinInputField style={{border:"1px solid #dbdee9"}}/>
<PinInputField style={{border:"1px solid #dbdee9"}}/>
<PinInputField style={{border:"1px solid #dbdee9"}}/>
<PinInputField style={{border:"1px solid #dbdee9"}}/>
</PinInput></HStack>
<p style={{color:"orange",fontWeight:"bold",width:"90%",fontSize:"14px",textAlign:"right",marginTop:"20px"}}>RESEND OTP</p>
<div style={{width:"415px",height:"100px",margin:"0px 0px 32px"}}>
<button className="signup_modal_btns"  onClick={Verifyotp}>Continue</button>
</div>
</div>
    )}
          </div>
        </div>
        </div>
       
      
    </Modal>
  );
}
