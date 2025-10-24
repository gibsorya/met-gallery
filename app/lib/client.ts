
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

export async function getObjectIds() {
    let data = await fetch(`${baseApiUrl}/objects`, { cache: 'force-cache'});
    let objects: ObjectList = await data.json();

    return objects;
}

export async function getObjectByID(ID: number) {
    let data = await fetch(`${baseApiUrl}/objects/${ID}`);
    let object: ArtObject = await data.json();

    console.log("OBJECT", object)

    return object;
}