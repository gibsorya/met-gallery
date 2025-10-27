'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Department } from "@/app/lib/client"

import './style.css'

interface CollectionsProps {
    departments: Department[]
}

export default function Collections(props: CollectionsProps) {
    const { departments } = props;

    return (
        <div className="departments-list flex flex-col flex-1 w-full">
            {departments.map((department) => {
                return (
                    <div key={`department-${department.departmentId}`} className="department flex p-4">
                        <h5>{department.displayName}</h5>
                    </div>
                )
            })}
        </div>
    )
}