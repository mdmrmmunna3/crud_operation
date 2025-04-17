import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, category, details } = coffee;
    const navigate = useNavigate();

    const hanldeUpdateCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const details = form.details.value;

        const updateCoffee = { name, category, details };
        // console.log(coffe);

        fetch(`http://localhost:5000/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updateCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    alert('Coffee Updated Successfully!')
                }
                navigate('/');
            })
            .catch((err) => {
                console.error("add coffe update error", err)
            })
    }
    return (
        <div>
            <form onSubmit={hanldeUpdateCoffee} className='w-[600px] mx-auto bg-violet-400 p-10 text-white rounded-md'>
                <div>
                    <label htmlFor="name">Coffe Name</label>
                    <input type="text" name="name" id="" defaultValue={name} placeholder='Coffe Name'
                        className='w-full py-2 pl-3 rounded-sm'
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="" defaultValue={category} placeholder='Category'
                        className='w-full py-2 pl-3 rounded-sm'
                    />
                </div>
                <div>
                    <label htmlFor="details">Coffe Details</label>
                    <textarea name="details" id="" defaultValue={details} placeholder='Coffe details'
                        className='w-full py-2 pl-3 rounded-sm'
                    ></textarea>
                </div>
                <div className='mt-5'>
                    <input
                        className='text-center w-full bg-blue-600 py-2 font-serif uppercase cursor-pointer transition-all hover:bg-blue-700'
                        type="submit" value="Update Coffee" />
                </div>
            </form>
        </div>
    );
};

export default UpdateCoffee;