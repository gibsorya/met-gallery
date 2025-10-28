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
    try {
        const url = new URL(`${baseApiUrl}`)

        if (searchParams && searchParams.q) {
            url.pathname += '/search'
            url.searchParams.append('q', searchParams.q)
        } else {
            url.pathname += '/objects'
        }

        if (searchParams && searchParams.departmentId) {
            url.searchParams.append('departmentIds', searchParams.departmentId)
        }

        let data = await fetch(url);

        if (!data.ok) {
            return;
        }

        const contentType = data.headers.get('Content-Type');

        if (contentType && contentType.includes('text/html')) {
            return;
        }

        let objects: ObjectList = await data.json();

        return objects;
    } catch (error) {
        console.error("Error getting object IDS", error)
    }
}

export async function getObjectByID(ID: number) {
    try {
        let data = await fetch(`${baseApiUrl}/objects/${ID}`);

        if (!data.ok) {
            return;
        }

        const contentType = data.headers.get('Content-Type');

        if (contentType && contentType.includes('text/html')) {
            return;
        }

        let object: ArtObject = await data.json();

        return object;
    } catch (error) {
        console.error("Error getting object with ID: ", ID, error)
    }
}

export async function getDepartments() {
    try {
        let data = await fetch(`${baseApiUrl}/departments`, { cache: 'force-cache' })
        
        if(!data.ok) {
            return;
        }

        const departments: { departments: Department[] } = await data.json()

        return departments.departments;
    } catch (error) {
        console.error("Error getting departments")
    }
}
