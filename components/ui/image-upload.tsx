"use client"

import { useState, type FC, useEffect } from 'react';
import { Button } from './button';
import { ImagePlusIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpload: FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // claudinary doesn't have types
    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }


    if (!mounted) {
        return null
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden' >
                        <div className="z-10 absolute top-2 right-2">
                            <Button type='button' onClick={() => onRemove(url)} variant="destructive" size='sm' >
                                <Trash className='w-5 h-5' />
                            </Button>
                        </div>
                        <Image
                            fill
                            className='object-cover'
                            alt='Image'
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset='dyhfqrtl' >
                {({ open }) => {
                    const onClick = () => {
                        open()
                    }
                    return (
                        <Button type='button' disabled={disabled} variant='secondary' onClick={onClick} >
                            <ImagePlusIcon className='h-5 w-5 mr-2' />
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}
export default ImageUpload;