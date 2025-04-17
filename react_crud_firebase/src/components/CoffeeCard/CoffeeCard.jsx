import React from 'react';
import { Link } from 'react-router-dom';

const CoffeeCard = ({ coffee, onDelete }) => {
    const { _id, name, category, details } = coffee;

    const handleDelete = () => {
        onDelete(_id)
    }

    return (
        <div>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{category}</p>
                    <p>{details}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/viewCoffee/${_id}`}>
                            <button className="btn">view</button>
                        </Link>
                        <Link to={`/updateCoffee/${_id}`}>
                            <button className="btn">Edit</button>
                        </Link>
                        <button onClick={handleDelete} className="btn ">Delete X </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;