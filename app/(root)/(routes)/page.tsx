"use client"

import { useEffect } from 'react'

import { useStoreModal } from "@/hooks/use-store-modal"


const SetupPage = () => {

    // const onOpen = useStoreModal((state) => state.onOpen)
    // const isOpen = useStoreModal((state) => state.isOpen)
    const { onOpen, isOpen } = useStoreModal()

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen]);

    return null
}

export default SetupPage