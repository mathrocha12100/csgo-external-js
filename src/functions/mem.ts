import { openProcess, findModule, writeMemory, readMemory } from 'memoryjs';
import { IModule, IOpenProcess, MemoryTypes } from '../interfaces/MemoryJS';
import { MODULES } from '../offsets/offsets';

export function getMem() {
    const process: IOpenProcess = openProcess(MODULES.game);

    const clientModule: IModule = findModule(MODULES.client, process.th32ProcessID);
    const engineModule: IModule = findModule(MODULES.engine, process.th32ProcessID);

    return { process, clientModule, engineModule };
}

const { process, clientModule, engineModule } = getMem();

export function WriteMemory(adress: number, value: any, type: MemoryTypes) {
    writeMemory(process.handle, adress, value, type);
}

export function ReadMemory(adress: number, type: MemoryTypes) {
    return readMemory(process.handle, adress, type);
}