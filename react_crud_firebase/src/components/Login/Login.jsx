import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { signInUser } = useContext(AuthContext);
    const [loginErrors, setLoginErrors] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get the route user wanted to go before login
    const from = location?.state?.from?.pathname || '/'

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(password, email);
        setLoginErrors('');
        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                navigate(from, { replace: true })
                form.reset();
            })
            .catch(err => {
                console.log('ERROR', err.message);
                setLoginErrors(err.message);
            })
    }
    return (
        <div>
            <form onSubmit={handleLogin} className="">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input type="email" className="input w-full" name='email' placeholder="Email" />
                                <label className="fieldset-label">Password</label>
                                <input type="password" className="input w-full" name='password' placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                {
                    loginErrors && <p className='text-red-500 text-xs'>{loginErrors}</p>
                }
                <p>You Haven't account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;