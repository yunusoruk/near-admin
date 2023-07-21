"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Product } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
    id: string
    phone: string
    address: string
    products: string
    totalPrice: string
    isPaid: boolean
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    }
]
