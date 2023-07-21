import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function POST(
    req:Request,
    {params}: {params: {storeId: string}}

    ) {

    try {

        const {userId} = auth()

        const body = await req.json()


        


        const { name, images, price, categoryId, colorId, sizeId, isFeatured, isArchived } = body

        if(!userId) {
            return new NextResponse('Unauthorized', {status: 403})
        }

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



        

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
          }

        const store = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        // Block unauth access to store
        if(!store) {
            return new NextResponse('Unauthorized', {status: 405})

        }

        const product = await prismadb.product.create({
            data: {
              name,
              price,
              isFeatured,
              isArchived,
              categoryId,
              colorId,
              sizeId,
              storeId: params.storeId,
              images: {
                createMany: {
                  data: [
                    ...images.map((image: { url: string }) => image),
                  ],
                },
              },
            },
          });

        return NextResponse.json(product)
        
    } catch (error) {
        console.log('[POST_METHOD_CREATE_PRODUCT_API]', error);

        return new NextResponse('Internal error!', { status: 500})
    }
 

}



export async function GET(
    req: Request,
    { params }: { params: { storeId: string } },
  ) {
    try {
      const { searchParams } = new URL(req.url)
      const categoryId = searchParams.get('categoryId') || undefined;
      const colorId = searchParams.get('colorId') || undefined;
      const sizeId = searchParams.get('sizeId') || undefined;
      const isFeatured = searchParams.get('isFeatured');
  
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
  
      const products = await prismadb.product.findMany({
        where: {
          storeId: params.storeId,
          categoryId,
          colorId,
          sizeId,
          isFeatured: isFeatured ? true : undefined,
          isArchived: false,
        },
        include: {
          images: true,
          category: true,
          color: true,
          size: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      });
    
      return NextResponse.json(products);
    } catch (error) {
      console.log('[PRODUCTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };