import React, { Component } from "react";
import MoviesList from "./moviesList";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: {},
    searchQuery: "",
    sortColumn: { columnName: "title", sortOrder: "asc", icon: "fa fa-heart" }
  };

  async componentDidMount() {
    const { data: genresList } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ name: "All Genres" }, ...genresList];
    this.setState({ movies, genres });
  }

  handleDelete = async id => {
    let originalMovies = [...this.state.movies];

    try {
      let movies = [...this.state.movies];
      let index = movies.findIndex(m => m._id === id);
      movies.splice(index, 1);
      this.setState({ movies });

      await deleteMovie(id);
    } catch (ex) {
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = id => {
    let movies = [...this.state.movies];
    let index = movies.findIndex(m => m._id === id);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    let selectedGenre = this.state.genres.find(g => g._id === genre._id);
    this.setState({ selectedGenre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
  };

  render() {
    return (
      <div>
        <MoviesList
          movies={this.state.movies}
          genres={this.state.genres}
          user={this.props.user}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          selectedGenre={this.state.selectedGenre}
          searchQuery={this.state.searchQuery}
          sortColumn={this.state.sortColumn}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          onSort={this.handleSort}
          onSearch={this.handleSearch}
          onPageChange={this.handlePageChange}
          onGenreChange={this.handleGenreChange}
        />
      </div>
    );
  }
}

export default Movies;
