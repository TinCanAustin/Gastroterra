import { notFound } from "next/navigation";

export default async function result({ params } : {
    params: Promise<{ token: string }>
}){
    const { token } = await params;
    let _data;

    try{
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        const responce = await fetch(`${API_URL}/api/find-restaurent?token=${token}`, { method: 'GET' });
        _data = await responce.json();

        if(!_data || _data.error){
            notFound();
        }
    }catch (err){
        console.log(err);
        notFound()
    }

    return(
        <>
            <h2>Token {token}</h2>
            <div>
                <h2>Restaurant Name: {_data?.data?.name}</h2>
                <p>location: {_data?.data?.location}</p>
                <p>Rating: {_data?.data?.rating} ⭐</p>
                <p>Price Range: {_data?.data?.price_range}</p>
                <p>
                    Website: <a href={_data?.data?.url} target="_blank">{_data?.data?.url}</a>
                </p>
            </div>
        </>
    );
}