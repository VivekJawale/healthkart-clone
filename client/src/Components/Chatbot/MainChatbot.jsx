import React from "react";
import Bot from "./Bot";
import Container from "./Container";

const MainChatbot = () => {
  return (
    <>
      <div style={{ bottom: "20px", right: "20px", position: "absolute" }}>
        <Bot>
          <Container />
        </Bot>
      </div>
    </>
  );
};

export default MainChatbot;
