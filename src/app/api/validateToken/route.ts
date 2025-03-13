import { NextRequest, NextResponse } from "next/server";
import { session } from '../find-restaurent/route';

export async function GET(req: NextRequest) {
    try{
        const token = req.nextUrl.searchParams.get("token");

        if(!token){
            return NextResponse.json({error: true, message: 'Token Required'}, {status: 400});
        }
        
        if(!(token in session)){
            return NextResponse.json({error: false, sessionExsist: false});
        }
        return NextResponse.json({error: false, sessionExsist: true});
    }catch(err){
        return NextResponse.json({ error: true, message: 'Something went wrong.' }, { status: 500 });
    }
}