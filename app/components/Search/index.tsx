'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <div className="relative flex mx-8 w-full md:w-4/5">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                id="search"
                className="block w-full rounded-lg border-2 border-gray-200 py-4 px-10 text-md outline-0 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
}