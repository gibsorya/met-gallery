import Image from "next/image";
import { ArtObject, getObjectByID, getObjectIds } from "./lib/client";

import Gallery from "./components/gallery";
import GalleryItem from "./components/galleryItem";

let publicArt = new Map<number, boolean>();
let artObjects: ArtObject[] = [];

export default async function Home() {
  artObjects = await getArtObjects()



  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Gallery batchLoaded={true}>
        {artObjects.map((artObject, index) => {
          return (<GalleryItem key={index} imageUrl={artObject.primaryImageSmall}></GalleryItem>);
        })}
      </Gallery>
    </div>
  );
}

export async function getArtObjects(limit = 80) {
  
  const ids = await getObjectIds();
  

  if(ids.objectIDs) {
    for (let i = 0; i < limit; i++) {
      const data = await getObjectByID(ids.objectIDs[i]);
      
      if (data.isPublicDomain) {
        artObjects.push(data);
      } else {}
    }
  }

  return artObjects
}

export async function fetchInBatches(batchSize = 80,) {
  
  
}
