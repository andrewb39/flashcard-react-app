import React, {useState, useEffect} from "react";
import { useParams, useHistory, Link, useRouteMatch} from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyDeck(){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [flipped, setFlipped] = useState(false);
    const [cardCount, setCardCount] = useState(1);

    const {deckId} = useParams();

    const history = useHistory();
    const {url} = useRouteMatch();
    
    useEffect(() => {
        const abortContoller = new AbortController();

        async function loadDeck(){
            const decksFromApi = await readDeck(deckId, abortContoller.signal);
            setDeck(decksFromApi);
            setCards(decksFromApi.cards);
            if(decksFromApi.cards.length > 0){
                setCurrentCard(decksFromApi.cards[0]);
            }
        }
        
        loadDeck();

        return () => {
            abortContoller.abort();
        }
    }, [deckId]);
    
    const nextCardHandler = () => {
        if(cardCount >= cards.length) {
            const confirmation = window.confirm("Restart cards? Click 'cancel' to return to the home page");
            if(confirmation) {
                setFlipped(!flipped);
                setCurrentCard(cards[0]);
                setCardCount(1);
                history.push(url);
            }else{
                history.push("/");
            }
        }else{
            setFlipped(!flipped);
            setCurrentCard(cards[cardCount]);
            setCardCount(cardCount +1);
            console.log(currentCard);
        }
    }

    const notEnoughCards = (
        <div>
            <h4 className="text-danger font-weight-bold">Not enough cards!</h4>
            <p>
                You need at least 3 cards to study. There are {cards.length} in this deck.
            </p>
            <div>
                <button type="button" className="btn btn-success" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
                    Add Cards
                </button>
            </div>
        </div>
    );
    
    const frontOfCard = (
        <div>
            <h5 className="card-title">Card {cardCount} of {cards.length}</h5>
            <p className="font-weight-bold font-italic mb-0">Front:</p>
            <p className="card-text">{currentCard.front}</p>
            <button type="button" className="btn btn-dark mr-2" onClick={() => setFlipped(!flipped)}>Flip</button>
        </div>

    )
    
    const backOfCard = (
        <div>
            <h5 className="card-title">Card {cardCount} of {cards.length}</h5>
            <p className="font-weight-bold font-italic mb-0">Back:</p>
            <p className="card-text">{currentCard.back}</p>
            <button type="button" className="btn btn-dark mr-2" onClick={() => setFlipped(!flipped)}>Flip</button>
            <button type="button" className="btn btn-success" onClick={nextCardHandler}>Next</button>
        </div>
    );

    return (
        <>
            <div className="main-container">
                <nav className="breadcrumb-nav">
                    <ul className="breadcrumb-list">
                    <Link to="/">
                        <li className="breadcrumbx-item">Home</li>
                    </Link>
                    <Link to={`/decks/${deck.id}`}>
                        <li className="breadcrumbx-item">{deck.name}</li>
                    </Link>
                        <li className="breadcrumbx-item active" aria-current="page">Study</li>
                    </ul>
                </nav>
            </div>
            <div className="decks">
                <div className="card-body">
                    {cards.length < 3 ?
                        notEnoughCards : (!flipped ? frontOfCard : backOfCard)
                    }
                </div>
            </div>
        </>
    )
}

export default StudyDeck;