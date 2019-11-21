import React from "react";

const ListGroup = ({
  items,
  keyProperty,
  valueProperty,
  selectedItem,
  onItemChange
}) => {
  let className = "list-group-item";

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          style={{ cursor: "pointer" }}
          className={
            selectedItem[keyProperty] === item[keyProperty]
              ? className + " active"
              : className
          }
          key={index}
          onClick={() => onItemChange(item)}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProperty: "_id",
  valueProperty: "name"
};

export default ListGroup;
