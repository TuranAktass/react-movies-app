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

const baseUrl = "https://www.omdbapi.com/?apikey=cebce6&s=";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/details/:id" element={<MovieDetail />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

interface MoviesProps {}

interface MoviesState {
  movies: any;
  searchKey: string;
  filterType: string;
}
class Movies extends React.Component<MoviesProps, MoviesState> {
  movies: any = [];

  constructor(props: MoviesProps) {
    super(props);
    this.state = {
      movies: [],
      searchKey: "",
      filterType: "",
    };
  }
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
        <Navi />
        <Row>
          <Col xs="4">
            <SearchBar handleSubmit={this.handleSubmit} />
          </Col>
          <Col xs="6">
            <MovieListComponents movies={this.state.movies} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
