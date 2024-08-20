import { Component } from "react";

import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json()) // converting to json
      .then((response) =>
        this.setState(
          () => {
            return {
              monsters: response,
            };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (event) => {
    let searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }; // Searching the input value to our whole component.
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    // Filtering the monster, getting each monter, and return the monster with the same value from searchInput
    const filteredMonsters = monsters.filter((monster) => {
      // Letting the behind the returing, we can use other scopes, and better practive
      return monster.name.toLocaleLowerCase().includes(searchField); // Use the original state, because, we can't change it.
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          className="search-box"
          placeholder="search monsters"
        />

        {/* {filteredMonsters.map(
          (
            monster // Mapping the filteredMonters, because, filter return us a new array with the logical passed to it
          ) => (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          )
        )} */}

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
