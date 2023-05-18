import Carousel from "react-bootstrap/Carousel";

export const LoginCarousel = () => {
  return (
    <Carousel
      variant="dark"
      controls={false}
      interval="1000"
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static1.hkrtcdn.com/hknext/static/media/login/slider/1.svg"
          alt="First slide"
          style={{ width: "390px", height: "290px" }}
        />
        <div
          style={{
            width: "70%",
            textAlign: "center",
            margin: "auto",
            height: "130px",
            marginTop: "10px",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "30px",
              color: "#1c1c28",
            }}
          >
            Wide range of Original & Authentic Nutritional Products
          </h4>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "20px",
              color: "#77777e",
            }}
          >
            We strive to provide 100% authentic products to our customers.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static1.hkrtcdn.com/hknext/static/media/login/slider/3.svg"
          alt="Second slide"
          style={{ width: "390px", height: "290px" }}
        />

        <div
          style={{
            width: "70%",
            textAlign: "center",
            margin: "auto",
            height: "130px",
            marginTop: "10px",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "30px",
              color: "#1c1c28",
            }}
          >
            Great Offers on Top Brands
          </h4>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "20px",
              color: "#77777e",
            }}
          >
            14 days hassle free return policy
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static1.hkrtcdn.com/hknext/static/media/login/slider/2.svg"
          alt="Third slide"
          style={{ width: "390px", height: "290px" }}
        />

        <div
          style={{
            width: "70%",
            textAlign: "center",
            margin: "auto",
            height: "130px",
            marginTop: "10px",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "30px",
              color: "#1c1c28",
            }}
          >
            Get Personalized Diet Plans and Fitness Advice
          </h4>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "20px",
              color: "#77777e",
            }}
          >
            Start your jouney towards a healthy lifestyle.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};
