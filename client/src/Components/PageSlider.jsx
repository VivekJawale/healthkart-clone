import React from 'react'
import '../style.css';
import Carousel from 'react-bootstrap/Carousel';
import Slide1 from '../assets/slider-2/bnr_2282338_o.webp';
import Slide2 from '../assets/slider-2/bnr_2282538_o.webp';
import Slide3 from '../assets/slider-2/bnr_2282540_o.webp';

import Container from 'react-bootstrap/esm/Container';

const PageSlider = () => {
  return (
    <div className='hero-slider'>
    <Container>
        <div className='pageslider-area'>
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
            </Carousel>
        </div>
    </Container>
    </div>

  )
}

export default PageSlider