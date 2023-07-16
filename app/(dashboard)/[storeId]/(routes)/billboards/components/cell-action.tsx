"use client"

import type { FC } from 'react';
import { BillboardColumn } from './columns';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

interface CellActionProps {
    data: BillboardColumn
}

const CellAction: FC<CellActionProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()

    return (
        <div>
            <Button
                onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                size="sm"
                variant='outline'
            >
                <PaperPlaneIcon />
            </Button>
        </div>
    );
}
export default CellAction; 