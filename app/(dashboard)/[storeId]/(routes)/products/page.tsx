import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/client"
import { ProductColumn } from "./components/columns"
import { format } from "date-fns"
import { formatter } from "@/lib/utils"

const ProductsPage = async (
    { params }: { params: { storeId: string } }
) => {



    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            color: true,
            size: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formatedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(+item.price),
        color: item.color.value,
        size: item.size.value,
        category: item.category.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))


    return (
        <div className="container flex-col">
            <div className="flex-1 space-y-4">
                <BillboardClient
                    data={formatedProducts}
                />
            </div>

        </div>
    )
}

export default ProductsPage