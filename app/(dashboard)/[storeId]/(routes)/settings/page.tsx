import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import type { FC } from 'react';
import SettingsForm from "./components/settings-form";
import prismadb from "@/lib/prismadb";

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {


    const { userId } = auth()
    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }




    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm
                    initialData={store}
                />
            </div>
        </div>
    )
}

export default SettingsPage



