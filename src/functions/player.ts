import { readMemory } from 'memoryjs';
import { vec3 } from '../interfaces/Vector';
import { SIGNATURES, NETVARS } from '../utils/offsets';
import { getMem, ReadMemory } from './mem';
import { calcVector3WithOtherVector3, Vector3 } from './vector';

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

function getDistance(entity: number, other: vec3) {
    const entPosition: vec3 = readMemory(process.handle, entity + NETVARS.m_vecOrigin, "vec3");
    const delta: vec3 = calcVector3WithOtherVector3(other, entPosition, "-");

    return Math.sqrt(delta.x * delta.x + delta.y * delta.y + delta.z * delta.z);
}

export function getBonePos(entity: number, bone: number) {
    const bonePos = Vector3();
    const bonePointer = ReadMemory(entity + NETVARS.m_dwBoneMatrix, "int")

    bonePos.x = ReadMemory(bonePointer + 0x30 * bone + 0x0C, "float");
    bonePos.y = ReadMemory(bonePointer + 0x30 * bone + 0x1C, "float");
    bonePos.z = ReadMemory(bonePointer + 0x30 * bone + 0x2C, "float");

    return bonePos;
}

export function getClosestPlayer() {

    const localEntity = getLocalPlayer();

    let closestDistance = 1000000;
	let closestDistanceIndex = -1;

    for (let i = 0; i < 64; i++) {
        let currentEntity = getEntityByIndex(i);

        if (!currentEntity || !getEntityHealth(currentEntity) || !isEnemy(currentEntity)) continue;

        const currentEntityVecOrigin: vec3 = readMemory(process.handle, currentEntity + NETVARS.m_vecOrigin, "vec3")

        const currentDistance = getDistance(localEntity, currentEntityVecOrigin);

        if (currentDistance < closestDistance) {
			closestDistance = currentDistance;
			closestDistanceIndex = i;
		}
    }

    if (closestDistanceIndex == -1) return null;

    return getEntityByIndex(closestDistanceIndex);
}