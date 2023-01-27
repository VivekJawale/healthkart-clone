import Carousel from "react-bootstrap/Carousel";

function MiniHomeCarousal({ data }) {
    const arr=[];
    const indicatorsLength=data.map((el)=>{
        arr.push(["btn"])
    })
  return (
    <Carousel indicatorLabels = {arr} nextIcon={<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="#212121" viewBox="0 0 512 512"><path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/></svg>} prevIcon={<svg xmlns="http://www.w3.org/2000/svg"  width="40px" height="40px" fill="#212121" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>} variant="dark">
      {data.map((el) => {
        return <Carousel.Item>
          <img className="d-block w-100" src={el} alt="First slide" />
        </Carousel.Item>;
      })}
    </Carousel>
  );
}

export default MiniHomeCarousal;