import React from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Card({card}) {
    const history = useHistory();
    const { url } = useRouteMatch();
    
    const handleDelete = async (card) => {
        const confirmation = window.confirm("Delete this card? You will not be able to recover it.");
        if(confirmation){
            await deleteCard(card.id);
            history.go(0);
        }
    };

    return (
        <div className="card">
            <div className="card-header text-center">
                <h2 className='text-center'>Cards</h2>
            </div>
            <div className="card-body">
                <div className="row d-flex justify-content-between">
                    <div className="col-5">
                        {card.front}
                    </div>
                    <div className="col-5">
                    {card.back}
                        <div className="btn-group-right">
                        <Link to={`${url}/cards/${card.id}/edit`}>
                            <button className="btn-sm btn-secondary btn-edit m-3">
                                Edit
                            </button>
                        </Link>
                        <button className="btn-sm btn-danger btn-delete m-3" onClick={() => handleDelete(card)}>
                            Delete Card
                        </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Card;