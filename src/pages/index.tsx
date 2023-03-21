import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SignIn from '../components/SignIn';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ticketmaster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center mw-600">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Ticketmaster
          </h1>
          <p>Experience the magic of Ticketmaster while reaching your customers on all of your owned marketing channels through Klaviyo.</p>
           <SignIn />
        </div>
      </main>
    </>
  );
};

export default Home;
