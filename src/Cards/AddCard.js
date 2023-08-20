import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard(){
    const [deck, setDeck] = useState({});
    const [frontOfCard, setFrontOfCard] = useState("");
    const [backOfCard, setBackOfCard] = useState("");

    const { deckId } = useParams();

    const history = useHistory();

    useEffect(() => {
        const abortContoller = new AbortController();
        readDeck(deckId, abortContoller.signal).then(setDeck);

        return () => {
            abortContoller.abort();
        }
    }, [deckId]);

    const handleFrontChange = (event) => setFrontOfCard(event.target.value);
    const handleBackChange = (event) => setBackOfCard(event.target.value);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const abortContoller = new AbortController();

        await createCard(deckId, {front: frontOfCard, back: backOfCard}, abortContoller.signal);
        setFrontOfCard("");
        setBackOfCard("");
        history.go(0);
    };

    return (
        <>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'> Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h1 className='my-4 text-center'>
                {deck.name}: <span>Add Card</span>
            </h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardForm frontOfCard={frontOfCard} handleFrontChange={handleFrontChange} backOfCard={backOfCard} handleBackChange={handleBackChange}/>
                    <button type="button" className="btn btn-dark mr-2" onClick={() => history.push(`/decks/${deckId}`)}>
                        Done
                    </button>
                    <button type="submit" className="btn btn-success">
                        Save
                    </button>
                </form>
            </div>
        </>
      );    
}

export default AddCard;