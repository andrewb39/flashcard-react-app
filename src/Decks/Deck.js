import React from "react";
import { useHistory, Link } from "react-router-dom";
import "../App.css";

function Deck({ deck, handleDelete }) {
    const history = useHistory();

    return (
        <>
            <div className="card">
                <div className="d-flex justify-content-between">
                    <h4 className="card-title">{deck.name}</h4>
                    <p>{deck.cards.length} cards</p>
                </div>

                <div className="card-text text-secondary">
                    <p>{deck.description}</p>
                </div>

                <div className="d-flex justify-contenent-between mt-4">
                    <div className="btn-group-left">
                        <Link to={`/decks/${deck.id}`}>
                            <button className="button-sm btn-view">View</button>
                        </Link>
                        <button className="button-sm btn-study" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                    </div>
                    <div className="btn-group-right">
                        <button className="button-sm btn-delete" onClick={() => handleDelete(deck)}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deck;