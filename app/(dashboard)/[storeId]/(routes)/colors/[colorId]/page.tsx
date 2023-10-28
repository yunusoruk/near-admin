import prismadb from "@/lib/prismadb"
import BillboardForm from "./components/color-form"
import SizeForm from "./components/color-form"


const SizePage = async ({ params }: { params: { colorId: string } }) => {

    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <div className="container flex-col">
            <div className="flex-1 space-y-4">
                <SizeForm
                    initialData={color}
                />
            </div>

        </div>
    )
}

export default SizePage