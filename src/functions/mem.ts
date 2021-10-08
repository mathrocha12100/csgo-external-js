import { openProcess, findModule, writeMemory, readMemory, getProcesses } from 'memoryjs';
import { IModule, IOpenProcess, MemoryTypes } from '../interfaces/MemoryJS';
import { MODULES } from '../utils/offsets';

export function getMem() {

    if (!getProcesses().find((f) => f.szExeFile == MODULES.game)) return {};

    const process: IOpenProcess = openProcess(MODULES.game);
    const clientModule: IModule = findModule(MODULES.client, process.th32ProcessID);
    const engineModule: IModule = findModule(MODULES.engine, process.th32ProcessID);

    return { process, clientModule, engineModule };
}

export function WriteMemory(adress: number, value: any, type: MemoryTypes) {
    
    let w = MODULES;
    if (!getProcesses().find((f) => f.szExeFile == MODULES.game)) return;
    if (!w.g.process) return;
    writeMemory(w.g.process.handle, adress, value, type);
}

export function ReadMemory(adress: number, type: MemoryTypes) {
    
    let w = MODULES;
    if (!getProcesses().find((f) => f.szExeFile == MODULES.game)) return;
    if (!w.g.process) return;
    return readMemory(w.g.process.handle, adress, type);
}


