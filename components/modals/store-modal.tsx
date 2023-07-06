"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useState } from "react"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {

    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal()

    // create form with useform

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    //on submit function

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post('api/stores', values)
            toast.success('Store created!', {
                style: {
                    border: '1px solid #574b90',
                    padding: '16px',
                    color: '#574b90',
                },
                iconTheme: {
                    primary: '#574b90',
                    secondary: '#FFFAEE',
                }
            })


        } catch (error) {
            toast.error('Something went wrong!', {
                style: {
                    border: '1px solid #574b90',
                    padding: '16px',
                    color: '#574b90',
                },
                iconTheme: {
                    primary: '#574b90',
                    secondary: '#FFFAEE',
                }
            })

        } finally {
            setLoading(false)

        }

    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}

        >
            {/* TODO: Create store form */}
            {/* 
            Form -> form -> formfield(control, name, render) -> formitem
            */}
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Store" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    variant='outline'
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}