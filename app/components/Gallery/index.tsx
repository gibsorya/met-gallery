import { unstable_cache } from "next/cache";
import { ArtObject, getDepartments, getObjectByID, getObjectIds } from "../../lib/client";
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

    if (artObjects.length == 0) {
        return <div className="flex flex-col w-full justify-center items-center">No matching results...</div>
    }

    return (
        <div className="gallery grid w-full md:w-4/5">
            {artObjects.map((artObject, index) => {
                return (<GalleryItem artObject={artObject} key={index} imageUrl={artObject.primaryImageSmall}></GalleryItem>);
            })}
        </div>
    );
}

const getCachedObjects = unstable_cache(
    async (searchParams?: { q?: string, departmentId?: string }) => {
        return await getArtObjects(searchParams)
    }
)

const getCachedArtObject = unstable_cache(
    async (ID: number) => {
        const data = await getObjectByID(ID)
        return data
    }
)

export async function getArtObjects(searchParams?: { q?: string, departmentId?: string }, limit = 80) {
    const ids = await getObjectIds(searchParams);

    artObjects = [];
    publicArt.clear();

    if (ids) {
        if (ids.objectIDs.length == 0) {
            return
        }

        for (let i = 1; i < limit; i++) {
            const data = await getCachedArtObject(ids.objectIDs[i])

            if (data && data.isPublicDomain && !publicArt.has(data.primaryImageSmall)) {
                artObjects.push(data)
                publicArt.set(data.primaryImageSmall, true)
            } else if (data === undefined) {
                break
            }
        }
    }
}