import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function POST(
    req:Request,
    {params}: {params: {storeId: string}}

    ) {

    try {

        const {userId} = auth()

        if(!userId) {
            return new NextResponse('Unauthorized', {status: 403})
        }

        const { name, value } = await req.json()

        if(!name) {
            return new NextResponse('Name is required', {status: 400})
        }

        if(!value) {
            return new NextResponse('Value is required', {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
          }

        const store = await prismadb.store.findMany({
            where: {
                userId,
                id: params.storeId
            }
        })

        // Block unauth access to store
        if(!store) {
            return new NextResponse('Unauthorized', {status: 405})

        }

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(size)
        
    } catch (error) {
        console.log('[POST_METHOD_CREATE_SIZE_API]', error);

        return new NextResponse('Internal error!', { status: 500})
    }
 

}



export async function GET(
    req:Request,
    {params}: {params: {storeId: string}}

    ) {

    try {


        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
          }



        const sizes = await prismadb.size.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(sizes)
        
    } catch (error) {
        console.log('[GET_METHOD_SIZE_API]', error);

        return new NextResponse('Internal error!', { status: 500})
    }
 

}