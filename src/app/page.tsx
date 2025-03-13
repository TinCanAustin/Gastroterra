"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  //Function to start the questionere
  const startButton = ()=>{
    router.push("/seek");
  }

  return (
    <>
      <h1>Gastroterra</h1>
      <button onClick={startButton}>Begin Experience</button>
      <br/><br/>
      <Link href="/session">Have a session code?</Link>
    </>
  );
}
