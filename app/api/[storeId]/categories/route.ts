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

        const { name, billboardId } = await req.json()

        if(!name) {
            return new NextResponse('Label is required', {status: 400})
        }

        if(!billboardId) {
            return new NextResponse('Image is required', {status: 400})
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category)
        
    } catch (error) {
        console.log('[POST_METHOD_CREATE_CATEGORY_API]', error);

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



        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(categories)
        
    } catch (error) {
        console.log('[GET_METHOD_CATEGORY_API]', error);

        return new NextResponse('Internal error!', { status: 500})
    }
 

}