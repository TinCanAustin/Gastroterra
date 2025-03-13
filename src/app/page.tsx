"use client";
import { useRouter } from "next/navigation";

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
      <a href="/session">Have a session code?</a>
    </>
  );
}
