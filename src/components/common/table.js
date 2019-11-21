import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const {
    items,
    filteredItems,
    columns,
    sortColumn,
    onSort,
    onLike,
    onDelete
  } = props;
  return (
    <React.Fragment>
      <p>
        Showing {items.length} out of {filteredItems.length} movies
      </p>
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody
          items={items}
          columns={columns}
          onLike={onLike}
          onDelete={onDelete}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
