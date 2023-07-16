"use client"

import { useState, useEffect } from 'react'

import { StoreModal } from "@/components/modals/store-modal"
import AlertModal from '@/components/modals/alert-modal';

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }

    return (
        <>
            <StoreModal />

        </>
    )
}