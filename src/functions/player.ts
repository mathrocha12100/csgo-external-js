import { readBuffer, readMemory } from 'memoryjs';
import { SIGNATURES, NETVARS } from '../offsets/offsets';
import { getMem } from './mem';

const { process, clientModule } = getMem();

const playerOffset = 0x10;

export function getEntityByIndex(index: number): number {
    return readMemory(process.handle, clientModule.modBaseAddr + SIGNATURES.dwEntityList + index * playerOffset, "int");
}

export function getLocalPlayer(): number {
    return readMemory(process.handle, clientModule.modBaseAddr + SIGNATURES.dwLocalPlayer, "int");
}

export function getEntityHealth(entity: number): number {
    return readMemory(process.handle, entity + NETVARS.m_iHealth, "int");
}

export function getMaxEntity() {
    return readMemory(process.handle, 0x0, "int");
}

export function isEnemy(entity: number) {
    const localEntity = getLocalPlayer();
    
    const localEntityTeamId = readMemory(process.handle, localEntity + NETVARS.m_iTeamNum, "int");
    const entityTeamId = readMemory(process.handle, entity + NETVARS.m_iTeamNum, "int");

    if (!localEntityTeamId || !entityTeamId) {
        return false;
    };

    return localEntityTeamId != entityTeamId;
}