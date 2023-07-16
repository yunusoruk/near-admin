"use client"

import { useEffect, type FC, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean
}

const AlertModal: FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {

    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Modal
            title="Are you sure?"
            description="This action will remove your store permanently."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-between w-full">
                <Button
                    disabled={loading}
                    variant='outline'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant='destructive'
                    onClick={onConfirm}
                >
                    Remove
                </Button>
            </div>

        </Modal>
    );
}
export default AlertModal;