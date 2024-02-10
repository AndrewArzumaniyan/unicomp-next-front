import React, { FC, ChangeEvent } from "react";

interface CheckboxProps {
  elem: { _id: string; name: string };
  checkeds: Array<{ _id: string }>;
  setCheckeds: (checkeds: Array<{ _id: string }>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ elem, checkeds, setCheckeds }) => {
  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    let curCheckboxId = event.target.id;
    let curIsChecked = event.target.checked;

    let tmpCheckeds = [...checkeds];

    if (curIsChecked) {
      if (tmpCheckeds.length >= 3) {
        let firstCheckboxId = tmpCheckeds[0]._id;
        (document.getElementById(firstCheckboxId) as HTMLInputElement).checked = false;

        tmpCheckeds = tmpCheckeds.filter((el) => el._id !== firstCheckboxId);
      }

      tmpCheckeds.push(elem);
    } else {
      tmpCheckeds = tmpCheckeds.filter((el) => el._id !== curCheckboxId);
    }

    setCheckeds(tmpCheckeds);
  };

  return (
    <label htmlFor={`${elem._id}`} className="checkbox__label">
      <input
        id={`${elem._id}`}
        defaultChecked={checkeds.includes(elem)}
        type="checkbox"
        className="checkbox__label-input"
        onChange={handleCheckbox}
      />
      <span className="checkbox__label-icon"></span>
      <span className="checkbox__label-text">{elem.name}</span>
    </label>
  );
};

export default Checkbox;
