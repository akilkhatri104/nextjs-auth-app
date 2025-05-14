"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";

export default function ProfilePage(){
    const router = useRouter()
    const [user,setUser] = React.useState({})
    const logout = async () => {
        try {
            const res = await axios('/api/users/logout')
            if(!res.data.success){
                throw new Error(res.data.error.message)
            }
            router.push('/login')
        } catch (error) {
            console.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios('/api/users/me')
            console.log(res.data)
            setUser(res.data.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getUserDetails()
    },[])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Profile</h1>
            <hr />
            <p>Profile Page</p>
            {user && (
                <div className="bg-gray-200 text-black flex flex-col items-center justify-center p-2">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button
                className="p-2 border border-black"
                onClick={logout}
            >Logout</button>
            <Link href="/">Home</Link>
        </div>
    )
}