import React, { useState, useEffect } from "react";
import "../App.css";
import {Link, useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from "../utils/api";

function EditCard() {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

    const { deckId, cardId } = useParams();
    const history = useHistory();

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);
   
    useEffect(() => {
        const abortContoller = new AbortController();

        async function loadCard() {
            const cardFromAPI = await readCard(cardId, abortContoller.signal);
            setCard(cardFromAPI);
            setFront(cardFromAPI.front);
            setBack(cardFromAPI.back);
        }

        readDeck(deckId, abortContoller.signal).then(setDeck);
        loadCard();
      }, [deckId, cardId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard({...card, front: front, back: back})
            .then((updatedCard) => history.push(`/decks/${updatedCard.deckId}`));
    };

    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                     </li>
                     <li className='breadcrumb-item active' aria-current='page'>
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <CardForm
                    frontOfCard={front}
                    handleFrontChange={handleFrontChange}
                    backOfCard={back}
                    handleBackChange={handleBackChange}
                />
                <button type="button" className="btn btn-dark mr-2" onClick={() => history.push(`/decks/${deckId}`)}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </div>
      );
}

export default EditCard;