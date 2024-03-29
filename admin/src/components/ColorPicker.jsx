import React from 'react';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';


const Color = styled.div`
    width: 36px;
    height: 14px;
    border-radius: 2px;
    background:  ${props => props.color};
`

const Swatch = styled.div`
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    border: 1px solid darkgray;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
`

const Popover = styled.div`
    position: absolute;
    z-index: 2;
`

const Cover = styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`


const ColorPicker = ({setColor, color}) => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);


      const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
      };
    
      const handleClose = () => {
        setDisplayColorPicker(false)
      };
    
      const handleChange = (color) => {
        setColor(color.hex)
      };

  return (
    <div>
        <Swatch onClick={handleClick}>
            <Color color={color}/>
        </Swatch>
        { displayColorPicker ? 
            <Popover>
            <Cover onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
            </Popover> 
        : null }
    </div>
  )
}

export default ColorPicker