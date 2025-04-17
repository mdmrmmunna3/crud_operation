import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewCoffee = () => {
    const coffee = useLoaderData();
    const { name, category, details } = coffee;
    return (
        <div className='mx-10'>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{category}</p>
                    <p>{details}</p>

                </div>
            </div>
        </div>
    );
};

export default ViewCoffee;