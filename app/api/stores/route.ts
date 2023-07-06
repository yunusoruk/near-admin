import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function POST(req:Request) {

    try {
        const {userId} = auth()

        if(!userId) {
            return NextResponse.json('Unauthorized', {status: 403})
        }

        const { name } = await req.json()

        if(!name) {
            return NextResponse.json('Name is required', {status: 400})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        })

        return NextResponse.json(store)
        
    } catch (error) {
        console.log('[POST_METHOD_STORE_API]', error);

        return new NextResponse('Internal error!', { status: 500})
        
    }
 
    

}