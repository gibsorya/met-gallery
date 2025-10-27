export const baseApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

type ObjectList = {
    total: number,
    objectIDs: number[]
}

export type ArtObject = {
    objectID: number,
    isPublicDomain: boolean,
    primaryImageSmall: string,
    department: string,
    objectName: string,
    title: string,
    artistDisplayName: string,
    artistDisplayBio: string,
    objectDate: string,
    medium: string,
    measurements: Measurement[]
}

type Measurement = {
    elementName: string,
    elementDescription: string,
    elementMeasurements: {
        height: number,
        width: number
    }
}

export type Department = {
    departmentId: number,
    displayName: string
}

export async function getObjectIds(searchParams?: { q?: string, departmentId?: string }) {
    const url = new URL(`${baseApiUrl}`)

    if(searchParams && searchParams.q) {
        url.pathname += '/search'
        url.searchParams.append('q', searchParams.q)
    } else {
        url.pathname += '/objects'
    }

    if(searchParams && searchParams.departmentId) {
        url.searchParams.append('departmentId', searchParams.departmentId)
    }

    let data = await fetch(url);
    let objects: ObjectList = await data.json();

    return objects;
}

export async function getObjectByID(ID: number) {
    let data = await fetch(`${baseApiUrl}/objects/${ID}`);
    let object: ArtObject = await data.json();

    return object;
}

export async function getDepartments() {
    let data = await fetch(`${baseApiUrl}/departments`, { cache: 'force-cache' })
    const departments: {departments: Department[]} = await data.json()

    return departments.departments;
}
