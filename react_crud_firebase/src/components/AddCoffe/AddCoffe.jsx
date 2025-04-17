import React from 'react';

const AddCoffe = () => {

    const handleAddCoffe = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const details = form.details.value;

        const coffe = { name, category, details };
        // console.log(coffe);

        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(coffe)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    alert('Add Coffe Successfully!')
                }
                form.reset();
            })
            .catch(err => {
                console.log("add coffe post error", err);
            })
    }

    return (
        <div>
            <form onSubmit={handleAddCoffe} className='w-[600px] mx-auto bg-violet-400 p-10 text-white rounded-md'>
                <div>
                    <label htmlFor="name">Coffe Name</label>
                    <input type="text" name="name" id="" placeholder='Coffe Name'
                        className='w-full py-2 pl-3 rounded-sm'
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="" placeholder='Category'
                        className='w-full py-2 pl-3 rounded-sm'
                    />
                </div>
                <div>
                    <label htmlFor="details">Coffe Details</label>
                    <textarea name="details" id="" placeholder='Coffe details'
                        className='w-full py-2 pl-3 rounded-sm'
                    ></textarea>
                </div>
                <div className='mt-5'>
                    <input
                        className='text-center w-full bg-blue-600 py-2 font-serif uppercase cursor-pointer transition-all hover:bg-blue-700'
                        type="submit" value="Add Coffe" />
                </div>
            </form>
        </div>
    );
};

export default AddCoffe;