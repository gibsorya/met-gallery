import { Suspense } from 'react';
import { getDepartments } from "./lib/client";

import Gallery from "./components/gallery";
import Collections from './components/Collections';
import LoadingSekelton from './components/LoadingSkeleton';
import Search from './components/Search';
interface PageProps {
  searchParams?: Promise<{ q?: string, departmentId?: string }>
}

export default async function Home(props: PageProps) {
  const params = await props.searchParams;
  const query = params?.q || ''
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
