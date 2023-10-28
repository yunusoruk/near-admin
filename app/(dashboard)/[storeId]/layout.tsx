import Navbar from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {

    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId,
            id: params.storeId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen flex-col space-y-8">
            <header className="border-b z-40 bg-background">
                <Navbar />
            </header>
            <main className="flex-1">
                {children}
            </main>
            <SiteFooter className="z-40 bg-background" />
        </div>
    )

}