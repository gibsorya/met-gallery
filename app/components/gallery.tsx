import { unstable_cache } from "next/cache";
import { ArtObject, getDepartments, getObjectByID, getObjectIds } from "../lib/client";
import './gallery.css'
import GalleryItem from "./galleryItem";

interface GalleryProps {
    query?: { q?: string, departmentId?: string }
}

let artObjects: ArtObject[] = [];
let publicArt = new Map<string, boolean>();

export default async function Gallery(props: GalleryProps) {
    const { query } = props;
    const params = await query

    await getCachedObjects(params)

    return (
        <div className="gallery grid">
            {artObjects.map((artObject, index) => {
                return (<GalleryItem artObject={artObject} key={index} imageUrl={artObject.primaryImageSmall}></GalleryItem>);
            })}
        </div>
    );
}

const getCachedObjects = unstable_cache(
    async (searchParams?: { q?: string, departmentId?: string }) => {
        return await getArtObjects(searchParams)
    }, ['art-objects']
)

export async function getArtObjects(searchParams?: { q?: string, departmentId?: string }, limit = 80) {
    const ids = await getObjectIds(searchParams);

    artObjects = [];
    publicArt.clear();

    for (let i = 1; i < limit; i++) {
        // const data = await getObjectByID(ids.objectIDs[i])
        const getCachedArtObject = unstable_cache(
            async () => {
                const data = await getObjectByID(ids.objectIDs[i])
                return data
            }, [`art-object-${i}`]
        )

        const data = await getCachedArtObject()
        console.log("DATA: ", i)
        if (data.isPublicDomain && !publicArt.has(data.primaryImageSmall)) {
            artObjects.push(data)
            publicArt.set(data.primaryImageSmall, true)
        }
    }
}