import React from "react";

const TableHeader = props => {
  const { onSort } = props;

  const raiseSort = columnName => {
    const sortColumn = { ...props.sortColumn };
    if (columnName === sortColumn.columnName) {
      sortColumn.sortOrder = sortColumn.sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortColumn.columnName = columnName;
      sortColumn.sortOrder = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = column => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.columnName) return null;
    return (sortColumn.icon =
      sortColumn.icon === "fa fa-sort-asc"
        ? "fa fa-sort-desc"
        : "fa fa-sort-asc");
  };

  return (
    <thead>
      <tr>
        {props.columns.map((column, index) => (
          <th
            key={index}
            onClick={() => raiseSort(column.path)}
            style={{ cursor: "pointer" }}
          >
            {column.label} {<i className={renderSortIcon(column)} />}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
