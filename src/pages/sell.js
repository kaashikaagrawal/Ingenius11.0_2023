import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { ref, push, set, onValue, update } from 'firebase/database';
import Header from '@/components/header';
import Head from 'next/head';
import firebase from 'firebase/app';
import 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { firebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import SoldBy from '@/components/seller';
import Link from 'next/link';
import 'firebase/auth'

const Sell = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [user] = useAuthState(auth);
    const [sells, setSells] = useState([]);
    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);


    const handlePopupSubmit = (event) => {
        event.preventDefault();
        // code to handle form submission goes here
        console.log(`Title: ${title}`);
        console.log(`Description: ${description}`);
        console.log(`Price: ${price}`);
        console.log(`File: ${file}`);
        console.log(`Address: ${address}`);
        console.log(`Phone: ${phone}`);

        setShowPopup(false);
        alert("Succesfully Uploaded");
    };


    useEffect(() => {
        if (!user) {
            return;
        }
        const sellItemsRef = ref(db, `users/${user.uid}/sellItems`);
        onValue(sellItemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const items = Object.values(data);
                setSells(items);
            } else {
                setSells([]);
            }
        });

    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const currentUser = auth.currentUser;
        if (!currentUser) {
            // User not authenticated
            return;
        }

        const sellItem = {
            email: currentUser.email,
            name: currentUser.displayName,
            title,
            description,
            price,
            address,
            phone,
            cartItemKey: null,
        };

        const sellItemsRef = ref(db, `users/${currentUser.uid}/sellItems`);
        push(sellItemsRef, sellItem);
        const newCartItemRef = push(sellItemsRef);
        const newCartItemKey = newCartItemRef.key;
        sellItem.cartItemKey = newCartItemKey;



        setTitle('');
        setDescription('');
        setPrice('');

        event.preventDefault();
        setShowPopup(true);

    };



    if (!user) {

        return (
            <div className="min-h-screen bg-black font-bold text-yellow-500 text-4xl mx-auto flex items-center justify-center ">
                Please Login Before Accessing this page
                <Link href='/home' className="bg-yellow-500 mx-auto hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                    Home
                </Link>
            </div>

        );

    }



    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">Sell Your Used AirPods</h1>
                <form onSubmit={handleSubmit} className="bg-transparent border border-yellow-500 rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-yellow-500 font-medium mb-2">
                            Model
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className="w-full border-yellow-500 border-2 rounded-md py-2 px-3 text-white leading-5 focus:outline-none focus:border-white bg-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-yellow-500 font-medium mb-2">
                            Phone No.
                        </label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            className="w-full border-yellow-500 border-2 rounded-md py-2 px-3 text-white leading-5 focus:outline-none focus:border-white bg-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-yellow-500 font-medium mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                            className="w-full border-yellow-500 border-2 rounded-md py-2 px-3 text-white leading-5 focus:outline-none focus:border-white bg-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-yellow-500 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                            className="w-full border-yellow-500 border-2 rounded-md py-2 px-3 text-white leading-5 focus:outline-none focus:border-white bg-transparent"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-yellow-500 font-medium mb-2">
                            Price
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <span className="inline-block absolute inset-y-0 left-0 pl-3 py-2 text-yellow-500 sm:text-sm">
                                Rs
                            </span>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                                className="block w-full pr-12 border-yellow-500 border-2 rounded-md pl-8 py-2 px-3 text-white leading-5 focus:outline-none focus:border-white bg-transparent"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>
                    {/* <div className="mb-4">

                        <button onClick={handleConfirm}>Upload Image</button>
                    </div> */}
                    <button
                        className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600"
                    >
                        Sell
                    </button>
                </form>
                {showPopup && (
                    <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50">
                        <form onSubmit={handlePopupSubmit} className="bg-yellow-500 rounded-lg p-6">
                            <p className="mb-4">Please confirm </p>
                            <div className="flex justify-between gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 ml-2 bg-black text-white rounded-md hover:bg-gray-800">
                                    Confirm
                                </button>
                            </div>
                        </form>


                    </div>

                )}
            </div>
        </>
    );
};

export default Sell;
