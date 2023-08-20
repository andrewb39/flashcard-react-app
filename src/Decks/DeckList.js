import React , {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { deleteDeck, listDecks } from "../utils/api";

import Deck from "./Deck";
function DeckList() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
      const abortContoller = new AbortController();
      listDecks(abortContoller.signal).then(setDecks);
      return () => {
        abortContoller.abort();
      };
    }, [])

    const handleDelete = async (deck) => {
        const confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
        if(confirmation){
            const abortController = new AbortController();
            await deleteDeck(deck.id, abortController.signal);
            history.go(0);
        }
    };

    return (
        <>
            {decks.map((deck, index) => (
                <Deck key={index} deck={deck} handleDelete={handleDelete}/>
            ))}
        </>
    )
}

export default DeckList;