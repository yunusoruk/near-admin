"use client"

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Separator } from '@/components/ui/separator';
import { Color } from '@prisma/client';
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

interface ColorFormProps {
    initialData: Color | null
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type ColorFormValues = z.infer<typeof formSchema>

const ColorForm: FC<ColorFormProps> = ({
    initialData
}) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMessage = initialData ? "Color updated" : "Color created"
    const action = initialData ? "Save changes" : "Create"





    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    })

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
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
            await axios.delete(`/api/${params.storeId}/colors/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success('Size removed')
        } catch (error) {
            toast.error('Something went wrong, please remove all products.')
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
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Color name'  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8">

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color value" {...field} />
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
export default ColorForm;