"use client"

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { SizeColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: FC<SizeClientProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Header
                    title={`Sizes (${data.length})`}
                    description='Manage sizes for your store'
                />
                <Button variant="default" size="default" onClick={() => router.push(`/${params.storeId}/sizes/new`)} >
                    <Plus className='mr-2 h-5 w-5' />
                    Add New
                </Button>

            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey='name'
                placeholder="Filter sizes..."
            />
            <Header title='API' description='API calls for sizes' />
            <Separator />
            <ApiList
                entityName='sizes'
                entityIdName='sizeId'
            />
        </>
    );
}
export default SizeClient;