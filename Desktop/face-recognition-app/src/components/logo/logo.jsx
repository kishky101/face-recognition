import React from "react";
import Tilt from 'react-parallax-tilt';
import Brain from '../logo/brain.png.png'
import './logo.css'

const Logo = () => {
    return (
        <div className="logo ma4 mt0" style={{width: '80px', height: 'auto'}}>
            <Tilt className="Tilt br2 shadow-2">
                <div >
                    <img src={Brain} alt='face' style={{height: 'auto', width: 'auto'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;

