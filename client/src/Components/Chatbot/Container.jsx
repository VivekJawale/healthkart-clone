import React, { useContext } from "react";
// import ChatBot from "bongga-react-simple-chatbot";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { chatBotContext } from "./Bot";

const Container = () => {
  const steps = useContext(chatBotContext);
  const theme = {
    background: "#fff",
    headerBgColor: "#0DCCC5",
    headerFontSize: "14px",
    botBubbleColor: "#fff",
    headerFontColor: "#fff",
    headerFontSize: "13px",
    botFontColor: "#000",
    userBubbleColor: "#0DCCC5",
    userFontColor: "#fff",
  };
  const config = {
    botAvatar:
      "https://haptikappimg.haptikapi.com/uploads/36ad523f11344f606efee4f7ab6cdad8.png?w=600&h=600",
    floating: true,
    userAvatar: "https://img.freepik.com/free-icon/user_318-875902.jpg?w=2000",
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="HealthMart is Online! Chat with us!"
        // speechSynthesis={{ enable: true, lang: "en" }}
        steps={steps}
        {...config}
      />
    </ThemeProvider>
  );
};

export default Container;
