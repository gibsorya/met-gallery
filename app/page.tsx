import { Suspense } from 'react';
import { getDepartments } from "./lib/client";

import Gallery from "./components/Gallery";
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
    <div className='flex flex-col gap-4 p-4 min-h-screen justify-start items-center'>
      <div className='flex flex-col w-full md:w-4/5 gap-4'>
        <Search placeholder='Search Art' />
        <div className='flex w-full justify-start'>
          <Collections departments={departments} currentDepartment={departmentId}></Collections>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center font-sans">
        <Suspense key={query + departmentId} fallback={<LoadingSekelton />}>
          <Gallery query={params} />
        </Suspense>
      </div>
    </div>
  );
}
