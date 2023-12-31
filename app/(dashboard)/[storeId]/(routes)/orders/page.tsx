import prismadb from "@/lib/prismadb"
import { OrderColumn } from "./components/columns"
import { format } from "date-fns"
import OrderClient from "./components/client"
import { formatter } from "@/lib/utils"

const OrdersPage = async (
    { params }: { params: { storeId: string } }
) => {



    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formatedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((item) => item.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))


    return (
        <div className="container flex-col">
            <div className="flex-1 space-y-4">
                <OrderClient
                    data={formatedOrders}
                />
            </div>

        </div>
    )
}

export default OrdersPage