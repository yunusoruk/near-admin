
import { UserButton, auth } from '@clerk/nextjs';
import type { FC } from 'react';
import { MainNav } from '@/components/mainnav';
import StoreSwitch from './switch-store';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';


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
        <div className='container'>
            <div className="px-4  h-16 items-center flex gap-4">
                <Link
                    href='/'
                >
                    <p className="uppercase font-bold text-2xl">
                        near
                    </p>

                </Link>
                <MainNav />
                <div className="ml-auto space-x-4 flex items-center">
                    <StoreSwitch items={stores} />
                    <ModeToggle />
                    <UserButton afterSignOutUrl='/' />

                </div>
            </div>
        </div>
    );
}
export default Navbar;