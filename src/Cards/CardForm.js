import React from "react";

function CardForm({ frontOfCard, handleFrontChange, backOfCard, handleBackChange }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="frontOfCard">Front</label>
        <textarea
          id="frontOfCard"
          name="frontOfCard"
          className="form-control"
          placeholder="Front side of card"
          rows="3"
          onChange={handleFrontChange}
          value={frontOfCard}
        />
      </div>
      <div className="form-group">
        <label htmlFor="backOfCard">Back</label>
        <textarea
          id="backOfCard"
          name="backOfCard"
          className="form-control"
          placeholder="Back side of card"
          rows="3"
          onChange={handleBackChange}
          value={backOfCard}
        />
      </div>
    </div>
  );
}

export default CardForm;