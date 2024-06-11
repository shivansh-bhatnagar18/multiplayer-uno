import {
    ReactElement,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';

export type User = {
    name: string;
    email: string;
};

export type AuthContextProps = {
    getUser: () => User | null;
    login: () => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};
export const AuthContext = createContext<AuthContextProps>({
    getUser: () => null,
    login: () => {},
    logout: () => {},
    isLoggedIn: () => false,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback(() => {
        setUser({
            name: 'John Doe',
            email: '',
        });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const getUser = useCallback(() => {
        return user;
    }, [user]);

    const isLoggedIn = useCallback(() => {
        return user !== null;
    }, [user]);

    return (
        <AuthContext.Provider value={{ getUser, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
