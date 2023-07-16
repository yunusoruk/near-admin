"use client"

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Billboards (${data.length})`}
                    description='Manage billboards for your store'
                />
                <Button variant="default" size="default" onClick={() => router.push(`/${params.storeId}/billboards/new`)} >
                    <Plus className='mr-2 h-5 w-5' />
                    Add New
                </Button>

            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey='label'
                placeholder="Filter billboards..."
            />
        </>
    );
}
export default BillboardClient;