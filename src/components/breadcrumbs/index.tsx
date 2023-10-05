import React from "react";

interface Props {
  title: string;
}

const Breadcrumbs = ({ title }: Props) => {
  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item">{title}</li>
    </ul>
  );
}

export default Breadcrumbs;
