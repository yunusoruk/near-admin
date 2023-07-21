import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
    ) {
        try {

            const { userId} = auth()
            const body= await req.json()

            if(!userId) {
                return new NextResponse('Unauthorized', {status: 403})
            }

            if(!params.productId) {
                return new NextResponse('Product is required', {status: 400})
            }

            const { name, images, price, categoryId, colorId, sizeId, isFeatured, isArchived } = body

            if(!name) {
                return new NextResponse('Name is required', {status: 400})
            }

            if(!images || !images.length ) {
                return new NextResponse('Images are required', {status: 400})
            }

            if(!price) {
                return new NextResponse('Price is required', {status: 400})
            }

            if(!categoryId) {
                return new NextResponse('CategoryId is required', {status: 400})
            }

            if(!colorId) {
                return new NextResponse('ColorId is required', {status: 400})
            }

            if(!sizeId) {
                return new NextResponse('SizeId is required', {status: 400})
            }

            if(!isFeatured) {
                return new NextResponse('IsFeatured is required', {status: 400})
            }

            if(!isArchived) {
                return new NextResponse('IsArchived is required', {status: 400})
            }

            

            const store = await prismadb.store.findMany({
                where: {
                    userId,
                    id: params.storeId
                }
            })

            if(!store) {
                return new NextResponse("Unauthorized", {status: 403})

            }

            await prismadb.product.update({
                where: {
                  id: params.productId
                },
                data: {
                  name,
                  price,
                  categoryId,
                  colorId,
                  sizeId,
                  images: {
                    deleteMany: {},
                  },
                  isFeatured,
                  isArchived,
                },
              });
          
              const product = await prismadb.product.update({
                where: {
                  id: params.productId
                },
                data: {
                  images: {
                    createMany: {
                      data: [
                        ...images.map((image: { url: string }) => image),
                      ],
                    },
                  },
                },
              })

            return NextResponse.json(product)

            
        } catch (error) {
            console.log('[PRODUCT_PATCH]', error);
            return new NextResponse("Internal error", {status: 500})
        }
    
}


export async function DELETE(
    _req: Request,
    {params}: {params: {storeId: string, productId: string}}
    // params has to be the second argument
    ) {
        try {

            const { userId} = auth()


            if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401})

            }


            if(!params.productId) {
            return new NextResponse("Product id is required", {status: 400})
        
            }

            const store = await prismadb.store.findMany({
                where: {
                    userId,
                    id: params.storeId
                }
            })

            if(!store) {
                return new NextResponse("Unauthorized", {status: 403})

            }

            const product = await prismadb.product.delete({
                where: {
                    id: params.productId
                }
            })

            return NextResponse.json(product)

            
        } catch (error) {
            console.log('[PRODUCT_DELETE]', error);
            return new NextResponse("Internal error", {status: 500})
        }
    
}

export async function GET(
    _req: Request,
    {params}: {params: {storeId: string, productId: string}}
    // params has to be the second argument
    ) {
        try {

            if(!params.productId) {
            return new NextResponse("Product id is required", {status: 400})
        
            }


            const product = await prismadb.product.findUnique({
                where: {
                    id: params.productId,
                }
            })

            return NextResponse.json(product)

            
        } catch (error) {
            console.log('[PRODUCT_GET]', error);
            return new NextResponse("Internal error", {status: 500})
        }
    
}