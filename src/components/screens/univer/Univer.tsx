import React, { FC } from "react";
import { Univer as UniverInterface } from "@/interfaces/univer.interface";


interface UniverProps {
  university: UniverInterface
}

const Univer: FC<UniverProps> = ({ university }) => {
  return (
    <>
      <h1>{university.name}</h1>
    </>
  );
}

export default Univer