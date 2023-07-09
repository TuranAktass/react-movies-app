import React, { Component, Fragment } from "react";
import "./App.css";
import Axios from "axios";
import { get } from "http";
import SearchBar from "./components/Searchbar";
import MovieListComponents from "./components/MovieList";
import { Col, Row } from "reactstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navi from "./components/Navi";

//@ts-ignore
import alertifyjs from "alertifyjs";

const baseUrl = "https://www.omdbapi.com/?apikey=cebce6&s=";

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Movies />}></Route>
        <Route path="/details/:id" element={<MovieDetail />}></Route>
      </Routes>
    );
  }
}

interface MoviesProps {}

interface MoviesState {
  movies: any;
  searchKey: string;
  filterType: string;
  favs: any;
}
class Movies extends React.Component<MoviesProps, MoviesState> {
  movies: any = [];

  constructor(props: MoviesProps) {
    super(props);
    this.state = {
      movies: [],
      searchKey: "",
      favs: [],
      filterType: "",
    };
  }

  addToFavs = (movie: any) => {
    let favs = this.state.favs;

    if (favs.some((e: any) => e.imdbID === movie.imdbID)) {
      favs.splice(favs.indexOf(movie), 1);
      alertifyjs.error(movie.Title + " removed from favorites");
    } else {
      favs.push(movie);
      alertifyjs.success(movie.Title + " added to favorites");
    }

    this.setState({ favs: favs });
  };
  /*
  componentDidMount(): void {
    this.GetMovie();
  } */

  GetMovie: any = async () => {
    try {
      let url = "";
      if (this.state.filterType == "") {
        url = baseUrl + this.state.searchKey;
      } else {
        url =
          baseUrl +
          this.state.searchKey +
          "&type=" +
          this.state.filterType.toLowerCase();
      }
      await Axios.get(url).then((response) => {
        this.setState({ movies: response.data.Search });
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = (searchKey: string, filterType: string) => {
    console.log("searchKey :::: " + searchKey);
    this.setState({ searchKey: searchKey, filterType: filterType }, () => {
      this.GetMovie();
    });
  };

  render() {
    return (
      <div className="App">
        <Navi favCount={this.state.favs.length} />
        <Row>
          <Col xs="4">
            <SearchBar handleSubmit={this.handleSubmit} />
          </Col>
          <Col xs="6">
            <MovieListComponents
              favs={this.state.favs}
              addToFav={this.addToFavs}
              movies={this.state.movies}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
