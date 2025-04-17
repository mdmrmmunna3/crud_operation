import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CoffeeCard from '../CoffeeCard/CoffeeCard';

const Home = () => {
    const loadedCoffee = useLoaderData();
    const [coffees, setCoffess] = useState(loadedCoffee);

    const handleDelete = (id) => {
        console.log(id)

        fetch(`http://localhost:5000/coffee/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },

        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('coffee item deleted successfully!');
                    const remaning = coffees.filter(coffee => coffee._id !== id);
                    setCoffess(remaning);
                }
            }).catch(err => {
                console.error('delete coffee error', err);
            })
    }
    return (
        <div>
            <h2 className='text-center text-cyan-500 font-medium font-serif uppercase text-4xl'>Hot Hot Cold Coffee: {coffees?.length} </h2>

            <div className='grid grid-cols-3 gap-5 mx-10'>
                {
                    coffees.map((coffee) => <CoffeeCard
                        key={coffee._id}
                        coffee={coffee}
                        onDelete={handleDelete}
                    ></CoffeeCard>)
                }
            </div>
        </div>
    );
};

export default Home;