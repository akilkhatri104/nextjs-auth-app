'use client'
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter()
    const [user,setUser] = React.useState({
        email: "",
        password: "",
    })
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState("")

    const onLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/users/login',user)
            if(!res.data.success){
                throw new Error(res.data.error)
            }
            console.log('Login success',res.data)
            router.push('/profile')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl p-2">Login</h1>
            {loading && 'Logging you in....'}
            {error && <span style={{color:"red"}}>{error}</span>}
            <label htmlFor="email">email </label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id='email'
                type='email'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">Password </label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id='password'
                type='password'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button 
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >Login</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    );
}