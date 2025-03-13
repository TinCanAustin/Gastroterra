"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function sessionFind(){
    const [token, setToken] = useState<string>('');
    const [notFound, setNotFound] = useState<boolean>(false);
    const router = useRouter()

    const submitHandle = async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const responce = await fetch(`api/validateToken?token=${token}`, { method: 'GET' });
            if(responce.ok){
                const data = await responce.json();
                if(data.sessionExsist == true){
                    router.replace(`/result/${token}`)
                }else{
                    setNotFound(true);
                }
            }
        }catch(err){
            console.error("Error: ", err);
        }
    }

    return(
        <>
            <h2>If you have a sessionID please enter it</h2>
            <form onSubmit={submitHandle}>
                <label htmlFor="sessionID">SessionID: </label>
                <input type="text" name="sessionID" onChange={e => setToken(e.target.value)}/>
                <br /><br />
                <button>Search</button>
            </form>
            {notFound ? <p>This session does not exsist.</p> : <></>}
        </>
    );
}