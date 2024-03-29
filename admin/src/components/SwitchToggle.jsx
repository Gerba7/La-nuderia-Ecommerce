import { useState } from 'react';
import styled from 'styled-components';



const CheckBoxWrapper = styled.div`
position: relative;
display: flex;
cursor: pointer;

  &:hover{
    cursor: pointer;
  }
`;
const CheckBoxLabel = styled.label`
position: absolute;
top: 0;
left: 0;
width: 42px;
height: 24px;
border-radius: 15px;
background: #bebebe;
cursor: pointer;

&::after {
  content: "";
  display: block;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin: 3px;
  background: #ffffff;
  transition: 0.2s;
}
`;
const CheckBox = styled.input`
opacity: 0;
z-index: 1;
border-radius: 15px;
width: 42px;
height: 27px;
cursor: pointer;
&:checked + ${CheckBoxLabel} {
  background: #4fbe79;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin-left: 21px;
    transition: 0.2s;
  }
}
`;



const SwitchToggle = ({inStock, id, fn}) => {

    
    const [checked, setChecked] = useState(inStock);
    
    const handleChange = () => {
        setChecked(!checked)
        fn(id, !inStock)
    }

  return (
        <CheckBoxWrapper>
            <CheckBox id={id} type="checkbox" checked={checked} onChange={handleChange} />
            <CheckBoxLabel htmlFor={id} />
        </CheckBoxWrapper>
  )
}

export default SwitchToggle;