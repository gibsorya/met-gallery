import { Suspense } from 'react';
import { getDepartments } from "./lib/client";

import Gallery from "./components/gallery";
import Collections from './components/Collections';
import LoadingSekelton from './components/LoadingSkeleton';

import GalleryItem from "./components/galleryItem";

let publicArt = new Map<number, boolean>();
let artObjects: ArtObject[] = [];

  const departmentId = params?.departmentId || '';
  const departments = await getDepartments()

  return (
    <div className='flex flex-col gap-4 p-4 min-h-screen justify-center items-center'>
      <Search placeholder='Search Art' />
      <div className="flex flex-col w-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <Collections departments={departments}></Collections>
        <Suspense key={query + departmentId} fallback={<LoadingSekelton />}>
          <Gallery query={params} />
        </Suspense>
      </div>
    </div>
  );
}
