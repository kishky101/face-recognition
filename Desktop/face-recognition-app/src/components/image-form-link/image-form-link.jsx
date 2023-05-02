import React from "react";
import './image-form-link.css'

const ImageLinkForm = ({onInputChange, onSubmitButton}) => {

    return (
        <div className="mw8 center">
            <p className="f3 tc black">{'This magic will detect faces on your pictures, Give it a try!!!'}</p>
            <div className="form p4 br3 w-80 shadow-5">
                <input className="f4 pa2 w-70" type="text" onChange={onInputChange}/>
                <button 
                    className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick={onSubmitButton}
                >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;