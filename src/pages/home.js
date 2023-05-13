import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import Header from '@/components/header';

export default function FoodieHomePage() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <div className="main" style={{ position: 'relative', height: 'calc(100vh - 64px)' }}>
                <div className="overlay"></div>
                <video
                    src="/airpod.mp4"
                    autoPlay
                    loop
                    muted
                    controls={false}
                    disablePictureInPicture={true} // Add this line to disable PiP
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: '1',
                        width: '100%',
                        marginTop: '250px',
                        opacity: '50%',
                        height: '80%',
                    }}
                />

                {/* <div className="content">
          <h1>Welcome</h1>
        </div> */}
                <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">
                    <div className="flex flex-col items-center justify-center text-center px-4 py-8 lg:p-0 opacity-[100%]">
                        <h1 className="text-4xl lg:text-5xl text-white font-bold mb-4">
                            Welcome to our Website!
                        </h1>
                        <p className="text-lg lg:text-xl text-white mb-8">
                            Buy or Sell your Airpods Here!
                        </p>
                        <div className="flex justify-center">
                            <Link href="/dashboard">
                                {/* <button className="bg-white text-gray-600 py-3 px-6 rounded-full shadow-lg transition duration-1000 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 z--1">
                Buy/sell
              </button> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}