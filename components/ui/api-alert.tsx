"use client"

import type { FC } from 'react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { CopyIcon, Server } from 'lucide-react';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
    title: string
    description: string
    variant: "admin" | "public"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

const ApiAlert: FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {

    const onCopy = () => {
        // copy to clipboard
        navigator.clipboard.writeText(description)
        toast.success('API route copied.')
    }

    return (
        <Alert>
            <Server className='h-4 w-4' />
            <AlertTitle className='flex items-center gap-x-2'>
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className='mt-4 flex items-center justify-between'>
                <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy}>
                    <CopyIcon className='w-5 h-5' />
                </Button>
            </AlertDescription>
        </Alert>
    );
}
export default ApiAlert;