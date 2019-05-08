import React from "react";
import { Link } from "react-router-dom";

function BoxList(props) {
  const havaBoxs = Array.isArray(props.Boxes);
  const boxItens =
    props.Boxes &&
    props.Boxes.flatMap(box => {
      return (
        <li key={box._id}>
          <Link to={`/box/${box._id}`}>{box.title}</Link>
        </li>
      );
    });

  return <ul>{havaBoxs ? boxItens : <li>Nenhuma box foi criada</li>}</ul>;
}

export default BoxList;
