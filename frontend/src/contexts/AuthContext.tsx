import {
    ReactElement,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useToast } from '../library/toast/toast-context';
import * as channel from '../channel';
import { useLocation, useNavigate } from 'react-router-dom';

export type User = {
    name: string;
    id: string;
};

export type AuthContextProps = {
    getUser: () => User | null;
    authenticate: (
        name: string,
        pass: string,
        newuser?: boolean
    ) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
    jwt: string;
};
export const AuthContext = createContext<AuthContextProps>({
    getUser: () => null,
    authenticate: () => new Promise(() => {}),
    logout: () => {},
    isLoggedIn: () => false,
    jwt: '',
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<User | null>(null);
    const [jwt, setJwt] = useState<string>('');
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const authWith = useCallback(
        function (token: string, userId: string) {
            setJwt(token);
            localStorage.setItem('jwt', token);
            channel.setAuthCreds(token, userId);
            channel.startPolling();
            if (location.search) {
                navigate('/game' + location.search);
            }
        },
        [location.search, navigate]
    );

    useEffect(() => {
        const localToken = localStorage.getItem('jwt');
        async function checkExistingJWT() {
            try {
                const res = await fetch(
                    process.env.REACT_APP_BACKEND_URL + '/auth/verify',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            token: localToken,
                        }),
                    }
                );
                if (!res.ok) {
                    throw new Error('Invalid token');
                } else {
                    const data = await res.json();
                    // so the jwt was valid
                    setUser({
                        name: data.user.username,
                        id: data.user._id,
                    });
                    authWith(localToken!, data.user._id);
                }
            } catch (e) {
                console.info('deleting existing jwt');
                localStorage.removeItem('jwt');
            }
        }
        if (localToken) checkExistingJWT();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authenticate = useCallback(
        async (
            username: string,
            password: string,
            newuser: boolean = false
        ) => {
            const authType = newuser ? 'register' : 'login';
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URL + '/auth/' + authType,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            if (!response.ok) {
                toast.open({ message: 'Invalid credentials', color: 'error' });
                return;
            }
            const data = await response.json();
            console.log(data);
            setUser({
                name: data.user.username,
                id: data.user._id,
            });
            authWith(data.token, data.user._id);
        },
        [setUser, toast, authWith]
    );

    const logout = useCallback(() => {
        setUser(null);
        setJwt('');
        localStorage.removeItem('jwt');
        channel.stopPolling();
    }, []);

    const getUser = useCallback(() => {
        return user;
    }, [user]);

    const isLoggedIn = useCallback(() => {
        return !!jwt;
    }, [jwt]);

    return (
        <AuthContext.Provider
            value={{
                getUser,
                authenticate,
                logout,
                isLoggedIn,
                jwt: jwt,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
