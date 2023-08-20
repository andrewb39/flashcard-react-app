import React, {useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const history = useHistory();
    const {deckId} = useParams();

    useEffect(() => {
      const abortContoller = new AbortController();
    
      readDeck(deckId, abortContoller.signal).then((deck) => {
        setName(deck.name);
        setDescription(deck.description);
      });

      return () => {
        abortContoller.abort();
      }
    }, [deckId]);

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortContoller = new AbortController();

        const updatedDeck = await updateDeck({name: name, description: description, id: deckId}, abortContoller.signal);

        setName("");
        setDescription("");
        history.push(`/decks/${updatedDeck.id}`)
    };
    
    return (
        <div>
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{name ? name : 'Loading...'}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Edit Deck
                    </li>
                </ol>
            </nav>
          <h2>Edit Deck</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="mame"
                className="form-control"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="5"
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
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

export default EditDeck;