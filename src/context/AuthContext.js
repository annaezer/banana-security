import {createContext, useEffect, useState,} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import tokenExpired from "../helpers/tokenExpired";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });

    useEffect(() => {
        console.log("Context wordt gerefresht!");
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode(token);
            if (token && (tokenExpired(decoded))) {
                fetchUserData(decoded.sub, token);
            }
        } else {
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, [])

    function logIn(token) {
        console.log('Gebruiker is ingelogd!');
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        const id = decoded.sub;
        fetchUserData(id, token, '/profile');
    }

    async function fetchUserData(id, token, redirect) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            setIsAuth({
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    id: response.data.id
                },
                status: 'done'
            })
            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            })
        }
    }

    function logOut() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        navigate('/');
    }

    const data = {
        authenticated: isAuth.isAuth,
        login: logIn,
        logout: logOut,
        user: isAuth.user
    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
