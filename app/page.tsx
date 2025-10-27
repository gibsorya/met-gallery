import { Suspense } from 'react';
import { getDepartments } from "./lib/client";

import Gallery from "./components/gallery";
import Collections from './components/Collections';
import LoadingSekelton from './components/LoadingSkeleton';

import GalleryItem from "./components/galleryItem";

let publicArt = new Map<number, boolean>();
let artObjects: ArtObject[] = [];

export default async function Home() {
  artObjects = await getArtObjects()



  return (
      <div className="flex flex-col w-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <Gallery batchLoaded={true}>
        <Suspense key={query + departmentId} fallback={<LoadingSekelton />}>
          <Gallery query={params} />
        </Suspense>
      </div>
    </div>
  );
}
