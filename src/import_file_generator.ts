import { AxiosResponse } from 'axios';

export interface PulumiImportRef {
    type: string;
    name: string;
    id: string;
}

export async function generateImportFile(fileName: string, importRefs: PulumiImportRef[]): Promise<void> {
    const importJson: {
        "resources": PulumiImportRef[]
    } = { resources: [] };
    
    importRefs.forEach((importRef: PulumiImportRef) => importJson.resources.push(importRef));

    return writeImportFile(fileName, importJson);
}


export async function writeImportFile(
    outputPath: string,
    contents: object
): Promise<void> {
    const fs = require('fs');
    
    try {
        await fs.promises.writeFile(outputPath, JSON.stringify(contents, null, 2));
        console.log(`Import file written to ${outputPath}`);
    } catch (error) {
        console.error('Error writing import file:', error);
        throw error;
    }
}
