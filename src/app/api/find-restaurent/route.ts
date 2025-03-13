import { Preference } from "@/dtos/preference.dot";
import { NextRequest, NextResponse } from "next/server";

export let session: { [key: string] : {content: any, expiration: number}} = {};

function generateToken() : string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for(let i = 0; i < 5; i++){
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

function generateExpiration(): number{
    const currentTime = new Date();
    currentTime.setHours(23, 59, 59, 999);
    return currentTime.getTime();
}

function validateExpiration(expiration:number) : boolean {
    const currentTime = new Date().getTime();
    return currentTime > expiration;
}

export async function GET(req: NextRequest) {
    try{
        const token = req.nextUrl.searchParams.get("token");

        if(!token){
            return NextResponse.json({error: true, message: 'Token Required'}, {status: 400});
        }
        
        if(!(token in session)){
            return NextResponse.json({error: true, message: 'Session Not Found'}, {status: 404});
        }

        const content = session[token];

        if(validateExpiration(content.expiration)){
            delete session[token];
            return NextResponse.json({error: true, message: 'Session has expired.'}, {status: 410});
        }

        return NextResponse.json({ error: false, data: content.content });
    }catch (err){
        return NextResponse.json({ error: true, message: 'Something went wrong.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    try{
        const body: Preference = await req.json();

        const prompt = `I want some restaurant recommendation from yelp with these descriptions:
        Here are the expected choices:
        ${body}
        
        REQUIREMENT:
        - Needs to be from Yelp
        - Provide the Yelp link (URL must be valid)
        - Only give ONE RANDOM result that FITS THE DESCRIPTION
        - Drop the location as well
        - Return result ONLY in JSON forma
        - Everything must be withing BC, Canada
        - Price range must be given in words like "Between 20 to 30$ or more than 50$ per person"
        - If location cannot be returned in the following JSON format then fine another resturent that can.
        
        JSON FORMAT:
        {
            "name" : "",
            "location": "",
            "rating": "",
            "price_range: "",
            "url": "",
            "atoa": "",
        }
        (atoa: Approximate time of arrivle for location)
        `

        const responce = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'system', content: 'You are an assistant who gives restaurant recommendations.'}, {role: 'user', content: prompt}],
                temperature: 0.7
            })
        });

        const data = await responce.json();
        const jsonString = data.choices[0].message.content.trim()
        const jsonData = JSON.parse(jsonString)

        const token = generateToken();
        const _expiration = generateExpiration();

        session[token] = {
            content: jsonData,
            expiration: _expiration
        }

        console.log('Session Stored: ', session[token]);

        return NextResponse.json({error: false, token: token});
    }catch(err){
        return NextResponse.json({error: true, message: 'Something went wrong.'}, {status: 500})
    }
}