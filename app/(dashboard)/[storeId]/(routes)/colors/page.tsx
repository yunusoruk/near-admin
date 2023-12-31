import prismadb from "@/lib/prismadb"
import { ColorColumn } from "./components/columns"
import { format } from "date-fns"
import ColorClient from "./components/client"

const SizesPage = async (
    { params }: { params: { storeId: string } }
) => {



    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formatedSizes: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))


    return (
        <div className="container flex-col">
            <div className="flex-1 space-y-4">
                <ColorClient
                    data={formatedSizes}
                />
            </div>

        </div>
    )
}

export default SizesPage