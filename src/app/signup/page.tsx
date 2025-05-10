'use client'
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const router = useRouter()
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState("")

    const onSignup = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/users/signup',user)
            console.log('Signup success',res.data)
            if(!res.data.success){
                throw new Error(res.data.error)
            }
            router.push('/login')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
        
    }

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            {loading ? (<h1>Loading...</h1>) : null}
            {error ? (<h1 className="text-red-500">{error}</h1>) : null}
            <label htmlFor="username">Username </label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id='username'
                type='text'
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />
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
                value={user.password}
                type='password'
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button 
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled}
            >{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    );
}