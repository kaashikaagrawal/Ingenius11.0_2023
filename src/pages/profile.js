import React, { useState } from "react";
import Link from 'next/link';
import { auth } from '../pages/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'
import Header from '@/components/header';
import Head from "next/head";
import { db } from "../pages/firebase";


export default function Profile() {
    const [user, setUser] = useAuthState(auth);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
        const results = await signInWithPopup(auth, googleAuth);
        const { user } = results;
        const userInfo = {
            name: user.displayName,
            email: user.email
        }
    }
    useEffect(() => {
        console.log(user);
    }, [user])


    const handleClick = () => {
        window.open(user.photoURL, "_blank");
    };


    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />
            <div className="py-4 px-8 min-h-screen bg-black">
                {user && (
                    <div className="border border-white text-white shadow-lg rounded-3xl mx-auto p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <img
                            className="rounded-full h-24 w-24 sm:h-16 sm:w-16 mx-auto border cursor-pointer border-white mb-4"
                            src={user.photoURL}
                            alt="Profile picture"
                            onClick={handleClick}
                        />
                        <div className="text-center sm:text-left">
                            <p className="mb-2  font-bold font-mono text-lg sm:text-3xl">Name: <span className="text-xl text-gray-300">{user.displayName}</span></p>
                            <p className="mb-2  font-bold font-mono text-lg sm:text-3xl">Email:<span className="text-xl text-gray-300"> {user.email}</span></p>
                        </div>
                    </div>
                )}
                <form className="bg-black rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-white font-medium mb-2">
                            Phone No.
                        </label>
                        <input
                            type="text"
                            id="title"
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            placeholder="Enter your number"
                            required
                            className="w-full border-gray-300 border rounded-md py-2 px-3 text-black leading-5 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-white font-medium mb-2">
                            Address
                        </label>
                        <textarea
                            id="description"
                            onChange={(event) => setAddress(event.target.value)}
                            required
                            placeholder="Enter your Address"
                            className="w-full border-gray-300 border rounded-md py-2 px-3 text-white leading-5 focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}
