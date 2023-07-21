"use client"

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Orders (${data.length})`}
                    description='View your orders'
                />

            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey='products'
                placeholder="Filter orders..."
            />

        </>
    );
}
export default OrderClient;