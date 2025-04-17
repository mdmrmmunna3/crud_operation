import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Register = () => {

    const { createUser } = useContext(AuthContext);

    const [signupError, setSignupError] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, password, email);
        setSignupError('');
        createUser(email, password)
            .then((result) => {
                console.log(result.user);

                updateProfile(result.user, {
                    displayName: name,
                }).then(() => {
                    console.log('user profile update');

                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(result.user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.insertedId) {
                                alert('user create Successfully!')
                            }
                        })
                        .catch(err => {
                            console.error('post data error', err.message);
                        })

                    form.reset();
                }).catch(err => {
                    console.log('ERROR', err);
                })
            })
            .catch(err => {
                console.log(err);
                setSignupError(err.message);
            })
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className="">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input type="text" className="input w-full" name='name' placeholder="Name" />
                                <label className="fieldset-label">Email</label>
                                <input type="email" className="input w-full" name='email' placeholder="Email" />
                                <label className="fieldset-label">Password</label>
                                <input type="password" className="input w-full" name='password' placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                {
                    signupError && <p className='text-red-500 text-xs'>{signupError}</p>
                }
                <p>You Have account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;