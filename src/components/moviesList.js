import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Search from "./common/search";

const MoviesList = ({
  movies,
  genres,
  user,
  pageSize,
  currentPage,
  selectedGenre,
  searchQuery,
  sortColumn,
  onDelete,
  onLike,
  onSort,
  onSearch,
  onPageChange,
  onGenreChange
}) => {
  const handleDelete = id => {
    onDelete(id);
  };

  const handleLike = index => {
    onLike(index);
  };

  const handlePageChange = page => {
    onPageChange(page);
  };

  const handleGenreChange = genre => {
    onGenreChange(genre);
  };

  const handleSort = sortColumn => {
    onSort(sortColumn);
  };

  const handleSearch = value => {
    onSearch(value);
  };

  let filteredMovies = movies;

  if (searchQuery) {
    filteredMovies =
      searchQuery !== ""
        ? movies.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        : movies;
  } else if (selectedGenre) {
    filteredMovies = selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;
  }

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.columnName],
    [sortColumn.sortOrder]
  );

  const allMovies = paginate(sortedMovies, pageSize, currentPage);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemChange={handleGenreChange}
          />
        </div>
        <div className="col-9">
          {user.name && (
            <Link to="/movie/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
          <Search onSearch={handleSearch} />
          <MoviesTable
            items={allMovies}
            filteredItems={filteredMovies}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            onSearch={handleSearch}
            sortColumn={sortColumn}
          />
          <Pagination
            totalItems={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MoviesList;
