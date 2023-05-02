import React from "react";
import './face-recognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="relative mt2">
                <img id="input-image" src={imageUrl} alt="" width="500px" height="auto"/>
                <div className="bounding-box" style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;
