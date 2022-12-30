import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`Emailadres is: ${email}, wachtwoord is ${password}`)
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            });
            console.log(response);
            const token = response.data.accessToken;
            console.log (token);
            login(email, token);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor='emailSignIn'>
                    Emailadres
                    <input
                        type='email'
                        id='emailSignIn'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label htmlFor='passwordSignIn'>
                    Wachtwoord
                    <input
                        type='password'
                        id='passwordSignIn'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {error && <p>Gegevens onjuist</p>}
                <button type='submit'>Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
