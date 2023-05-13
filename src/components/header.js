import Link from 'next/link';
import { auth } from '../pages/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'
import { useState } from 'react';

const Header = () => {
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

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClick = () => {
        window.open(user.photoURL, "_blank");
      };
      
    return (
        <nav className="bg-black shadow-lg py-4 ">
            <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-8 ">
                    <Link href="/home" passHref>
                        <div className="hidden sm:block">

                            <button className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </button>
                        </div>
                    </Link>
                    {user &&
                        <Link href="/dashboard" passHref>
                            <div className="hidden sm:block">

                                <button className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </button>
                            </div>
                        </Link>
                    }
                    {user &&
                        <div className="hidden sm:block ">
                            <div className="flex space-x-4">
                                <button className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => auth.signOut()}>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    }
                    {!user &&
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <button className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={login}>
                                    Sign in
                                </button>
                            </div>
                        </div>
                    }
                    {user &&
                        <Link href="/profile">
                            <p className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Profile
                            </p>
                        </Link>
                    }
                    {/* {user &&
                        <img
                            className="rounded-full h-8 w-8  border cursor-pointer float-right border-white mb-4"
                            src={user.photoURL}
                            alt="Profile picture"
                            onClick={handleClick}
                        />
                    } */}
                </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex sm:hidden">
                <button
                    type="button"
                    className="bg-black inline-flex items-center justify-center p-2 rounded-md text-[#FBBF24] hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-expanded={menuOpen}
                    onClick={handleMenuToggle}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <svg
                        className="hidden h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            <div className={`${menuOpen ? "block" : "hidden"} sm:hidden bg-[#202124] pb-3`}>

                <Link href="/home" passHref>
                    <p className="block px-3 py-2 text-white hover:bg-yellow-600 hover:text-white rounded-md text-sm font-medium">Home</p>
                </Link>

                {user &&
                    <Link href="/dashboard" passHref>
                        <p className="block px-3 py-2 text-white hover:bg-yellow-600 hover:text-white rounded-md text-sm font-medium">Dashboard</p>
                    </Link>
                }
                {user &&
                    <div
                        className="text-white cursor-pointer hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => auth.signOut()}
                        style={{ userSelect: 'none', cursor: 'pointer' }}
                    >
                        Sign out
                    </div>


                }


                {!user &&
                    <div
                        className="text-white cursor-pointer hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={login}
                        style={{ userSelect: 'none', cursor: 'pointer' }}
                    >
                        Sign in
                    </div>
                }
                {user &&
                    <Link href="/profile">
                        <p className="text-white hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Profile
                        </p>
                    </Link>
                }
            </div>





        </nav>
    );
};

export default Header;

