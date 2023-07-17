"use client"

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { TrashIcon } from 'lucide-react';
import { useState, type FC } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import AlertModal from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';

interface BillboardFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: FC<BillboardFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit billboard" : "Create billboard"
    const description = initialData ? "Edit a billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated" : "Billboard created"
    const action = initialData ? "Save changes" : "Create"





    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: ""
        }
    })

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error('Something went wrong.')
        }
        finally {
            setLoading(false)
        }

    }

    const onRemove = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success('Billboard removed')
        } catch (error) {
            toast.error('Something went wrong, please remove all categories.')
        }
        finally {
            setLoading(false)
            setOpen(false)
        }

    }



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onRemove}
                loading={loading}

            />
            <div className='flex items-center justify-between'>
                <Header
                    title={title}
                    description={description}
                />
                {
                    initialData && (
                        <Button
                            disabled={loading}
                            variant='destructive'
                            size='icon'
                            onClick={() => setOpen(true)}
                        >
                            <TrashIcon className='h-5 w-5' />
                        </Button>
                    )
                }

            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">

                        <FormField
                            control={form.control}
                            name='label'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Label
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Billboard label'  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">

                        <FormField
                            control={form.control}
                            name='imageUrl'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Image
                                    </FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            disabled={loading}
                                            value={field.value ? [field.value] : []}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange('')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>

        </>

    );
}
export default BillboardForm;