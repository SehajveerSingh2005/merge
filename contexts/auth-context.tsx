"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, User } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: { email: string; password: string; username: string; name: string }) => Promise<void>;
    githubAuth: () => void;
    githubCallback: (token: string, user: User) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    const response = await api.getCurrentUser();
                    setUser(response.user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clear invalid token
                api.clearToken();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        
        // Listen for storage changes to handle token updates from other tabs/pages
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'auth_token') {
                if (e.newValue) {
                    // Token was added/updated, fetch user info
                    api.getCurrentUser()
                        .then(response => setUser(response.user))
                        .catch(error => {
                            console.error('Failed to get user after token update:', error);
                            api.clearToken();
                            setUser(null);
                        });
                } else {
                    // Token was removed (logout)
                    setUser(null);
                }
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.login(email, password);
            setUser(response.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData: { email: string; password: string; username: string; name: string }) => {
        try {
            const response = await api.register(userData);
            setUser(response.user);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const githubAuth = () => {
        api.githubAuth();
    };

    const githubCallback = async (token: string, user: User) => {
        try {
            console.log('githubCallback called with token:', token);
            console.log('githubCallback called with user:', user);
            await api.githubCallback(token, user);
            console.log('api.githubCallback completed');
            setUser(user);
            console.log('setUser completed with user:', user);
        } catch (error) {
            console.error('GitHub callback failed:', error);
            throw error;
        }
    };

    const logout = () => {
        api.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        githubAuth,
        githubCallback,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}