'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"

interface GalleryItemProps {
    imageUrl: string
}

export default function GalleryItem(props: GalleryItemProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isPortrait, setIsPortrait] = useState(false)
    const { imageUrl } = props;

    useEffect(() => {
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
            if(img.height > img.width) {
                setIsPortrait(true)
            }
            
            const width = isPortrait ? 400 : 800
            const height = isPortrait ? 800 : 400
            setDimensions({ height: height, width: width })
        }

    }, [imageUrl])

    const style = {
        gridColumnEnd: `span ${isPortrait ? 1 : 2}`,
        gridRowEnd: `span ${isPortrait ? 2 : 1}`,
        'object-fit': 'contain'
    }

    return (
        <div style={style} className="gallery-item">
        <Image style={{objectFit: 'cover'}} src={imageUrl} alt={''} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
        </div>
    );
}

function getSpanEstimate(size: number) {
    if(size > 500) {
        return 2;
    }

    return 1;
}