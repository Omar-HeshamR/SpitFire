import React, { useState } from "react";
import styled from "styled-components";

const DropdownSelect = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <SelectContatiner value={selectedValue} onChange={handleChange}>
      {!selectedValue && <option>Select Rapper</option>}
      <option value="Donald Trump">Donald Trump</option>
      <option value="Joseph Biden">Joseph Biden</option>
      <option value="Barack Obama">Barack Obama</option>
      <option value="Morgan Freeman">Morgan Freeman</option>
      <option value="Andrew Tate">Andrew Tate</option>
      <option value="Eminem">Eminem</option>
      <option value="Mr. Krabs">Mr. Krabs</option>
      <option value="Squidward">Squidward</option>
    </SelectContatiner>
  );
};

const SelectContatiner = styled.select`
    width: 15vw;
    border: none;
    border-radius: 0.5vw;
    padding: 0.75vw;
    option {
        background-color: white;
        border: none;
        font-size: 1.25vw;
      }
      &:focus {
        outline: none;
      }
`


export default DropdownSelect;
