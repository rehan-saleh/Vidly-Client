import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

const MoviesTable = props => {
  const {
    items,
    filteredItems,
    onLike,
    onDelete,
    onSort,
    onSearch,
    sortColumn
  } = props;

  const deleteColumn = {
    key: "delete",
    label: "Delete",
    content: item => (
      <button className="btn btn-danger" onClick={() => onDelete(item._id)}>
        Delete
      </button>
    )
  };

  const columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: item => (
        <Like liked={item.liked} onClick={() => onLike(item._id)} />
      )
    }
  ];

  const user = auth.getCurrentUser();
  if (user.name && user.isAdmin) {
    columns.push(deleteColumn);
  }

  if (items && items.length === 0) return "There are no movies to show";

  return (
    <Table
      items={items}
      columns={columns}
      filteredItems={filteredItems}
      onLike={onLike}
      onDelete={onDelete}
      onSort={onSort}
      onSearch={onSearch}
      sortColumn={sortColumn}
    />
  );
};

export default MoviesTable;
