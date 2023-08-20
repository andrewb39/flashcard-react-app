import React, {useState, useEffect} from "react";
import { useParams, useHistory, Route, Link} from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import Card from "../Cards/Card";

function ViewDeck(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    useEffect(() => {
      const abortContoller = new AbortController();
        
      readDeck(deckId, abortContoller.signal).then(setDeck);
      return () => {
        abortContoller.abort();
      }
    }, [deckId]);

    const handleDelete = async (deck) => {
        const confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
        if(confirmation){
            const abortController = new AbortController();
            await deleteDeck(deck.id, abortController.signal);
            history.push("/");
        }
    };

    return (
    <>
      <div className="main-container">
        <Route path="/decks">
          <nav className="breadcrumb-nav">
            <ul className="breadcrumb-list">
              <Link to="/">
                <li className="breadcrumbx-item">
                  Home
                </li>
              </Link>
              <li className="breadcrumb-item">{deck.name}</li>
            </ul>
          </nav>
        </Route>

        <div>
          <div className="deck-name">
            <h1>{deck.name}</h1>
          </div>

          <div className="deck-description">
            <p>{deck.description}</p>
          </div>
          <div className="deck-buttons-container">
            <div className="btn-group-left">
              <button className="button-sm btn-edit" onClick={() => history.push(`/decks/${deck.id}/edit`)}>Edit</button>
              <button className="button-sm btn-study" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
              <button className="button-sm btn-add" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>Add Cards</button>
            </div>

            <div className="btn-group-right">
              <button className="button-sm btn-delete" onClick={() => handleDelete(deck)}>Delete</button>
            </div>
          </div>
        </div>

        <h1>Cards</h1>
        {(deck.cards) ? deck.cards.map((card, index) => (
          <Card card={card} key={index} />
        )) : <p>No cards for this deck</p>}
      </div >

    </>
  );
}

export default ViewDeck;