import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Container, AppBar, Toolbar, Button } from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";

const App = () => {
  const [books, setBooks] = useState([]);

  const columns = [
    { field: "id", headerName: "Book ID", type: "number", width: 110 },
    { field: "title", headerName: "Title", width: 410 },
    { field: "authors", headerName: "Author", width: 210 },
    {
      field: "average_rating",
      headerName: "Average Rating",
      type: "number",
      width: 150,
    },
    { field: "isbn", headerName: "ISBN", width: 120 },
    { field: "language_code", headerName: "Language", width: 120 },
    {
      field: "ratings_count",
      headerName: "Rating Count",
      type: "number",
      width: 140,
    },
    { field: "price", headerName: "Price", type: "number", width: 90 },
  ];

  const rows = books.map(
    ({
      bookID: id,
      title,
      authors,
      average_rating,
      isbn,
      language_code,
      ratings_count,
      price,
    }) => ({
      id,
      title,
      authors,
      average_rating,
      isbn,
      language_code,
      ratings_count,
      price,
    })
  );

  const hook = () => {
    axios
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
      )
      .then((response) => {
        setBooks(response.data);
      });
  };

  useEffect(hook, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/checkout">
            cart
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/checkout">
          <div></div>
        </Route>
        <Route path="/">
          <div style={{ height: 670, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              checkboxSelection
              showToolbar
            />
          </div>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
