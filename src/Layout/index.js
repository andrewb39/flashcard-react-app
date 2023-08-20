import React from "react";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Decks/DeckList";
import ViewDeck from "../Decks/ViewDeck";
import StudyDeck from "../Decks/StudyDeck";
import EditDeck from "../Decks/EditDeck";
import CreateDeck from "../Decks/CreateDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";


function Layout() {

  const history = useHistory();

  return (
    <>
      <Header />
      <div className="container">
        <div className="list-group">
          <Switch>
            <Route exact path="/">
              <Link to="/decks/new">
                <div className="d-flex justify-content-between mt-4">
                  <button className ="btn btn-secondary" onClick={() => history.push("/decks/new")}>
                    Create Deck
                  </button>
                </div>
              </Link>
              <DeckList />
            </Route>
            <Route path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <ViewDeck />
            </Route>
            <Route exact path="/decks/:deckId/study">
              <StudyDeck />
            </Route>
            <Route exact path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route exact path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Layout;
