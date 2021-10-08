import { openProcess, findModule, writeMemory, readMemory } from 'memoryjs';
import { IModule, IOpenProcess, MemoryTypes } from '../interfaces/MemoryJS';
import { MODULES } from '../utils/offsets';

export function getMem() {
    try {
        const process: IOpenProcess = openProcess(MODULES.game);
        const clientModule: IModule = findModule(MODULES.client, process.th32ProcessID);
        const engineModule: IModule = findModule(MODULES.engine, process.th32ProcessID);
    
        return { success: true, process, clientModule, engineModule };
    } catch (error) {
        return { success: false };
    }
}

const { process } = getMem();

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
export function WriteMemory(adress: number, value: any, type: MemoryTypes) {
    writeMemory(process.handle, adress, value, type);
}

export function ReadMemory(adress: number, type: MemoryTypes) {
    return readMemory(process.handle, adress, type);
}
