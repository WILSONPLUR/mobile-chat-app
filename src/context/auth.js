import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    
    const value = {
        authenticated,
        setAuthenticated
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
