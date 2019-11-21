import React from "react";
import _ from "lodash";

const TableBody = props => {
  const { items, columns } = props;

  const renderCell = (column, item) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {items.map((item, index) => {
        return (
          <tr key={index}>
            {columns.map((column, i) => (
              <td key={i}>{renderCell(column, item)}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
