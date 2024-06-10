import {
    ReactElement,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';

export type User = {
    name: string;
    pass: string;
};

export type AuthContextProps = {
    getUser: () => User | null;
    login: (arg0: string, arg1: string) => void;
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

    const login = useCallback((name: string, pass: string) => {
        setUser({
            name: name,
            pass: pass,
        });
    }, [setUser]);

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
