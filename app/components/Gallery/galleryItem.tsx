'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArtObject } from "../../lib/client"
import { GalleryItemModal } from "./galleryItemModal"

interface GalleryItemProps {
    artObject: ArtObject
    imageUrl: string,
}

export default function GalleryItem(props: GalleryItemProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isPortrait, setIsPortrait] = useState(false)
    const [modalIsActive, setModalIsActive] = useState(false)

    const { imageUrl, artObject } = props;

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
        gridRowEnd: `span ${isPortrait ? 2 : 1}`
    }

    const handleOnOpen = () => setModalIsActive(true);
    const handleOnClose = () => setModalIsActive(false);

    return (
        <div onClick={handleOnOpen} id={`art-object-${artObject.objectID}`} style={style} className="gallery-item cursor-pointer">
            <Image style={{objectFit: 'cover'}} src={imageUrl} alt={''} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
            <GalleryItemModal artObject={artObject} onClose={handleOnClose} isActive={modalIsActive} />
        </div>
    );
}

function getSpanEstimate(size: number) {
    if(size > 500) {
        return 2;
    }

    return 1;
}