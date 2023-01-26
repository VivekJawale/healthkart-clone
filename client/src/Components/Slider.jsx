import React from 'react'
import '../style.css';
import Carousel from 'react-bootstrap/Carousel';
import Slide1 from '../assets/images/bnr_2282186_o.webp';
import Slide2 from '../assets/images/bnr_2282190_o.webp';
import Slide3 from '../assets/images/bnr_2282198_o.webp';
import Slide4 from '../assets/images/bnr_2282210_o.webp';
import Slide5 from '../assets/images/bnr_2282218_o.webp';
import Slide6 from '../assets/images/bnr_2282348_o.webp';

const Slider = () => {
  return (
    <div className='hero-slider'>
        <div className='slider-area'>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide2}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide3}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide4}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide5}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Slide6}
                    alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    </div>
  )
}

export default Slider