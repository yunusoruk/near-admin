import prismadb from "@/lib/prismadb"
import BillboardForm from "./components/size-form"
import SizeForm from "./components/size-form"


const SizePage = async ({ params }: { params: { sizeId: string } }) => {

    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <div className="container flex-col">
            <div className="flex-1 space-y-4">
                <SizeForm
                    initialData={size}
                />


            </div>

        </div>
    )
}

export default SizePage