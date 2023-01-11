import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleLoading(true);
        toggleError(false);

        try {
            const response = await axios.post('http://localhost:3000/register', {
                email: email,
                password: password,
                username: username,
            });
            console.log(response);
            navigate('/signin');

        } catch (e) {
            toggleError(true);
            console.error(e);
        }
        toggleLoading(false);
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='emailSignUp'>
                    Emailadres
                    <input
                        type='email'
                        id='emailSignUp'
                        name='email-address-sign-up'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor='passwordSignUp'>
                    Wachtwoord
                    <input
                        type='password'
                        id='passwordSignUp'
                        name='password sign-up'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label htmlFor='usernameSignUp'>
                    Gebruikersnaam
                    <input
                        type='text'
                        id='usernameSignUp'
                        name='username sign-up'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                {error && <p>Gegevens onjuist</p>}
                <button type='submit'>Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
