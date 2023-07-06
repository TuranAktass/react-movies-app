import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

interface SearchBarProps {
  handleSubmit: (searchKey: string, filterType: string) => void;
}

interface SearchBarState {
  searchKey: string;
  filterType: string;
}
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchKey: "",
      filterType: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchKey: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.searchKey, this.state.filterType);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="searchKey"
              style={{ borderRadius: "5px", borderColor: "red" }}
              value={this.state.searchKey}
              onChange={this.handleInputChange}
            />
          </label>
          <input
            type="submit"
            value="Search"
            style={{
              borderColor: "red",
              borderRadius: "5px",
              backgroundColor: "red",
              color: "white",
            }}
          />
        </form>

        <ListGroup>
          <ListGroupItem
            active={this.state.filterType == "movie"}
            onClick={() => {
              this.setState({ filterType: "movie" });
              this.props.handleSubmit(
                this.state.searchKey,
                this.state.filterType
              );
            }}
          >
            Movies
          </ListGroupItem>
          <ListGroupItem
            active={this.state.filterType == "series"}
            onClick={() => {
              this.setState({ filterType: "series" });
              this.props.handleSubmit(
                this.state.searchKey,
                this.state.filterType
              );
            }}
          >
            Series
          </ListGroupItem>
          <ListGroupItem
            active={this.state.filterType == "episode"}
            onClick={() => {
              console.log("episode");
              this.setState({ filterType: "episode" });
              this.props.handleSubmit(
                this.state.searchKey,
                this.state.filterType
              );
            }}
          >
            Episodes
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default SearchBar;
