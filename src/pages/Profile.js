import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [secret, setSecret] =useState({});

    useEffect(()=>{
        async function getSecretData() {
            try {
                const secretData = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(secretData);
                setSecret(secretData.data);

            } catch (e) {
                console.error(e);
            }
        } void getSecretData();
    },[])


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>{secret.title}</h2>
                <p>{secret.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
