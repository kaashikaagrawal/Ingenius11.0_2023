import { getDatabase, ref, onValue, remove,update,set } from "firebase/database";
import { useState, useEffect } from "react";
import { firebaseApp } from './firebase';
import { getAuth } from 'firebase/auth';
import { auth } from '../pages/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from "@/components/header";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Modal from 'react-modal';
import Link from "next/link";


const Buy = () => {
    const [sellItems, setSellItems] = useState([]);
    const [filterAsc, setFilterAsc] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const sellItemsRef = ref(db, 'users');

        onValue(sellItemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const users = Object.values(data);
                const sellItemsArray = [];

                users.forEach(user => {
                    const sellItems = user.sellItems;
                    if (sellItems) {
                        Object.values(sellItems).forEach(item => {
                            sellItemsArray.push(item);
                        });
                    }
                });

                setSellItems(sellItemsArray);
            } else {
                setSellItems([]);
            }
        });
    }, []);

    const [user, setUser] = useAuthState(auth);
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


    const handleDelete = (cartItemKey) => {
        const db = getDatabase(firebaseApp);
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        if (!user) {
            // User not authenticated
            return;
        }
        const cartItemRef = ref(db, `users/${user.uid}/sellItems/${cartItemKey}`);

        // Remove the item from the database
        remove(cartItemRef);

        // Remove the item from the sellItems array in the component state
        const updatedSellItems = sellItems.filter((item) => item.cartItemKey !== cartItemKey);
        setSellItems(updatedSellItems);
    };

    const handleFilter = () => {
        const sortedSellItems = sellItems.slice().sort((a, b) => {
            if (filterAsc) {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });


        setSellItems(sortedSellItems);
        setFilterAsc(!filterAsc);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInput, setFilterInput] = useState('');

    const handleCity = (event) => {
        event.preventDefault();
        const filteredItems = sellItems.filter((item) =>
            item.address && item.address.toLowerCase().includes(filterInput.toLowerCase())
        );
        setSellItems(filteredItems);
        setIsModalOpen(false);
    };

    const [itemsBought, setItemsBought] = useState([]);

    const handleBuy = (item) => {
      const db = getDatabase(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
    
      if (!user) {
        // User not authenticated
        return;
      }
    
      const itemRef = ref(db, `bought/${user.uid}/`);
  
      update(itemRef, {
        bought: true,
        soldby: item.email,
        boughtfor: item.price,
        boughtby: user.email,
      })
        .then(() => {
          console.log('Item bought successfully');
          setItemsBought(prevItems => [...prevItems, item]); // add bought item to state array
        })
        .catch((error) => {
          console.error('Error buying item', error);
        });
    };
  
      


    if (!user) {

        return (
          <div className="min-h-screen bg-black font-bold text-yellow-500 text-4xl mx-auto flex items-center justify-center ">
            Please Login Before Accessing this page
            <Link href = '/home' className="bg-yellow-500 mx-auto hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
              Home
            </Link>
          </div>
          
        );
       
      }
    

    return (
        <div className="bg-black ">
            <Header />
            <div className="max-w-2xl mx-auto py-8 text-black  rounded-lg shadow-lg">
                <div className="flex justify-end gap-2 ">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleFilter}>
                        {filterAsc ? "Sort by Price (Low to High)" : "Sort by Price (High to Low)"}
                    </button>
                    <div className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
                        <button onClick={() => setIsModalOpen(true)} className="text-white">Filter by city</button>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                },
                                content: {
                                    backgroundColor: 'black',
                                    color: 'black',
                                    border: '1px solid white',
                                    text: 'black',
                                },
                            }}
                
                        >
                            <form onSubmit={handleCity} className="gap-5  justify-center items-center   ">
                                <input
                                    type="text"
                                    value={filterInput}
                                    onChange={(event) => setFilterInput(event.target.value)}
                                    className="rounded-md p-2 text-xl"
                                />
                                <button type="submit" className= "bg-yellow-500 ml-5 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ">Filter</button>
                                <button type="submit"  onClick={() => setIsModalOpen(false)} className= " ml-5 text-white font-bold py-2 px-4 rounded float-right ">X</button>

                            </form>

                        </Modal>

                    </div>

                </div>

                {sellItems.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {sellItems.map((item) => (
                            <div key={item.id} className="py-4">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold text-white">{item.title}</h2>
                                    <p className="text-lg font-bold text-right text-yellow-500">{item.price} Rs</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                <div className="mt-2 flex justify-between items-center">
                                    <p className="text-sm font-bold text-white">{item.name}</p>
                                    <p className="text-sm font-bold text-white">{item.email}</p>
                                    <p className="text-sm font-bold text-white">{item.address}</p>

                                </div>
                                <div className="mt-2 flex justify-between items-center">

                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mt-4 rounded"
                                        onClick={() => handleBuy(item)}
                                    >
                                        Buy
                                    </button>
                                    <p className="text-sm font-bold text-white">{item.price} Rs</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p className="text-4xl font-bold text-white">No items available for sale</p>
                )}
            </div>

        </div>
    );
};

export default Buy;