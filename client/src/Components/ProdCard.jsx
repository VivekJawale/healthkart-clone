import { Container } from '@chakra-ui/react'
import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import '../style.css'
import probox from '../assets/misc/prd_2256960_c_s.webp'
import {FiShoppingCart} from 'react-icons/fi'
import veg from '../assets/misc/icons8-vegetarian-food-symbol-20.png'

const ProdCard = (title, rating, reviews, saleprice, discount, salesprice, mrp ) => {
  return (
    <div>
        <Container>
            <Row>
                <Col className='prod-card'>
                    <div className='pmain-img'>
                            <img src={probox} alt="prod-" />
                    </div>
                    <div className='bottom-details'>
                        <div className='review-line'>
                            <div>
                                <span>4.5</span>
                                <span>11 reviews</span>
                            </div>
                            <div>
                                <img src={veg} alt="veg-mark"/>
                            </div>
                        </div>
                        <div className='prod-title'>
                            <p>MuscleBlaze CreaPRO Creatine with Creapure Powder from Germany,  Unflavoured  0.55 lb </p>
                        </div>
                        <div className='price-det'>
                            <span>₹1,099</span>
                            <span>₹1,677</span>
                            <span>33% off</span>
                        </div>
                        <div className='member'>
                            <span><img src="https://static1.hkrtcdn.com/hknext/static/media/common/premium_member.svg" alt="star" /></span>
                            <span>₹1,677</span>
                            <span>for Premium Member</span>
                        </div>
                        <button><span className='cart-icon'><FiShoppingCart/></span> Add to Cart</button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default ProdCard