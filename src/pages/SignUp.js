import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form>
          <label htmlFor='emailSignUp'>
              Emailadres
              <input
                  type='email'
                  id='emailSignUp'
                  name='email-address-sign-up'
                  // value=
                  // onChange=
              />
          </label>
          <label htmlFor='passwordSignUp'>
              Wachtwoord
              <input
                  type='password'
                  id='passwordSignUp'
                  name='password sign-up'
                  // value=
                  // onChange=
              />
          </label>
          <label htmlFor='usernameSignUp'>
              Gebruikersnaam
              <input
                  type='text'
                  id='usernameSignUp'
                  name='username sign-up'
                  // value=
                  // onChange=
              />
          </label>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;
