import React from "react";
import { Link } from "react-router-dom";
import notfound from "../assets/not-found.png";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  CardSubtitle,
  ListGroupItem,
  Button,
  ListGroup,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

interface MovieListProps {
  movies: any;
}

interface MovieListState {}

class MovieListComponents extends React.Component<
  MovieListProps,
  MovieListState
> {
  constructor(props: MovieListProps) {
    super(props);
  }

  render() {
    return (
      <Container>
        {this.props.movies == null ? (
          <NotFoundView />
        ) : (
          <ListGroup>
            {this.props.movies.map((movie: any) => (
              <div key={movie.imdbID}>
                {" "}
                <ListGroupItem>
                  <Row xs="3">
                    <img
                      src={movie.Poster}
                      max-height="100"
                      alt="movie poster"
                    />
                    <Container style={{}}>
                      {" "}
                      <ListGroupItemHeading>{movie.Title}</ListGroupItemHeading>
                      <ListGroupItemText>{movie.Year}</ListGroupItemText>
                      <Link to={`/details/${movie.imdbID}`}>
                        <Button
                        //navigate to details page
                        >
                          Show
                        </Button>
                      </Link>
                    </Container>
                  </Row>
                </ListGroupItem>
              </div>
            ))}{" "}
          </ListGroup>
        )}
      </Container>
    );
  }
}

export default MovieListComponents;

function NotFoundView() {
  return (
    <div>
      <img
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "max-content",
        }}
        src={notfound}
      ></img>
    </div>
  );
}
