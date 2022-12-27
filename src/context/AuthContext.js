import {createContext, useState,} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: '',
    });

    function logIn(email) {
        setIsAuth({
            isAuth: true,
            user: email
        });
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function logOut() {
        setIsAuth({
            isAuth: false
        });
        console.log('Gebruiker is uitgelogd!');
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
