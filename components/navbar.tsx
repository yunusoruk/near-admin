
import { UserButton, auth } from '@clerk/nextjs';
import type { FC } from 'react';
import { MainNav } from '@/components/mainnav';
import StoreSwitch from './switch-store';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';


interface navbarProps { }

const Navbar: FC<navbarProps> = async ({ }) => {

    const { userId } = auth()


    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })



    return (
        <div className='border-b'>
            <div className="px-4  h-16 items-center flex">
                <StoreSwitch items={stores} />
                <MainNav />
                <div className="ml-auto space-x-4 flex items-center">
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    );
}
export default Navbar;