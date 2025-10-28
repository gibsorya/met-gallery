import { createPortal } from "react-dom";
import { ArtObject } from "../../lib/client";


interface GalleryItemModalProps {
    artObject: ArtObject,
    isActive: boolean,
    onClose: () => void
}

export function GalleryItemModal(props: GalleryItemModalProps) {
    const { artObject, isActive, onClose } = props;

    if(!isActive) return null;

    const handleCloseClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents the event from bubbling up
        onClose();
    };

    return  (
        <div className="z-50 inset-0 flex items-center justify-center w-full h-full fixed">
            <div className="fixed inset-0 bg-black/75" onClick={handleCloseClick}></div>

            <div className={`modal relative z-50 bg-black border-2 rounded-lg p-6 shadow-xl min-w-sm max-w-xl border-gray-200 flex-col ${isActive && 'active'}`}>
                <div className="flex justify-between items-start pb-3">
                    <h3 className="text-4xl"><b>{artObject.title}</b></h3>
                    <button className="text-white border-none bg-none text-4xl cursor-pointer" onClick={handleCloseClick}><span className="block" aria-hidden="true">&times;</span></button>
                </div>
                <div className="flex flex-col">
                    {artObject.artistDisplayName && <p><b>Artist Name:</b> {artObject.artistDisplayName}</p>}
                    {artObject.artistDisplayBio && <p><b>Artist Bio:</b> {artObject.artistDisplayBio}</p>}
                    {artObject.medium && <p><b>Medium:</b> {artObject.medium}</p>}
                    {artObject.objectDate && <p><b>Est. Date:</b> {artObject.objectDate}</p>}
                </div>
            </div>
        </div>
    )
}