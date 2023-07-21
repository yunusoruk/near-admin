"use client"

import { useState, type FC } from 'react';
import { ColorColumn } from './columns';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AlertModal from '@/components/modals/alert-modal';
import axios from 'axios';

interface CellActionProps {
    data: ColorColumn
}

const CellAction: FC<CellActionProps> = ({ data }) => {

    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Copied')
    }

    const onRemove = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
            toast.success('Color deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Make sure you removed all products using this cplor first.');
        } finally {
            setOpen(false);
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onConfirm={onRemove}
                loading={loading}
                onClose={() => setOpen(false)}

            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button
                        size="sm"
                        variant='ghost'
                        className='h-8 w-8 p-0'
                    >
                        <span className='sr-only' >Open menu</span>
                        <MoreHorizontal className='w-5 h-5' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}> <Edit className='mr-4 h-5 w-5' /> Update</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy(data.id)} > <Copy className='mr-4 h-5 w-5' /> Copy Id</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)} > <Trash2 className='mr-4 h-5 w-5' /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
export default CellAction; 