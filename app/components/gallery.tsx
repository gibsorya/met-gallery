'use client'

import { useEffect } from "react"
import './gallery.css'

interface GalleryProps {
    batchLoaded: boolean,
    children?: React.ReactNode
}

const Gallery: React.FC<React.PropsWithChildren<GalleryProps>> = ({ batchLoaded, children }) => {
    return (
        <div className="gallery grid">{ children }</div>
    );
}

export default Gallery