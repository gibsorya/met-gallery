'use client'

import { Department } from "@/app/lib/client"
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import './style.css'
import { useState } from "react";

interface CollectionsProps {
    departments: Department[],
    currentDepartment?: string
}

export default function Collections(props: CollectionsProps) {
    const { departments, currentDepartment } = props;
    const [selectedDepartment, setSelectedDepartment] = useState<number>(currentDepartment as unknown as number)

    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        const value = event.target.value
        setSelectedDepartment(value as unknown as number)

        if(event.target.value != '0') {
            params.set('departmentId', value)
        } else {
            params.delete('departmentId')
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <select value={selectedDepartment || 0} onChange={handleChange} id='departments' className="departments-list flex w-1/4 py-4 px-4 text-md rounded-lg border-2 border-gray-200 outline-0">
            <option value={0}>All</option>
            {departments.map((department) => {
                return (
                    <option key={department.departmentId + 'department'} className="text-md" value={department.departmentId}>{department.displayName}</option>
                )
            })}
        </select>
    )
}