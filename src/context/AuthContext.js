import {createContext, useState,} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        // status: 'pending',
    });

    function logIn(token) {
        console.log('Gebruiker is ingelogd!');
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/600/users/${decoded.sub}`, {
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
                    }
                })
                navigate('/profile');

            } catch (e) {
                console.error(e);
            }
        }
        void fetchUserData();
    }

    function logOut() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null
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
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
