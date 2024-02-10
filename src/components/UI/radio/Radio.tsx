import React, { FC, ChangeEvent } from "react";

interface RadioProps {
  elem: string;
  setSelected: (elem: string) => void;
  name: string;
}

const Radio: FC<RadioProps> = ({ elem, setSelected, name }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(elem);
  };

  return (
    <label htmlFor={`radio-${elem}`} className="checkbox__label">
      <input
        id={`radio-${elem}`}
        name={`${name}`}
        type="radio"
        className="checkbox__label-input"
        onChange={handleChange}
      />
      <span className="checkbox__label-icon"></span>
      <span className="checkbox__label-text">{elem}</span>
    </label>
  );
};

export default Radio;
