import { cache } from "react";
import { promises as fs } from 'fs';

const getParcours = cache(async () => {
    const file = await fs.readFile(process.cwd() + '/temporary/BDD.json', 'utf8');
    const data = JSON.parse(file);
    return data
})