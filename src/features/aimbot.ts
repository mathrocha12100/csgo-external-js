import { ReadMemory, WriteMemory } from '../functions/mem';
import { getLocalPlayer, getClosestPlayer, getBonePos, playerIsSpotted } from '../functions/player';
import { calcVector3WithOtherVector3 } from '../functions/vector';
import { IModule } from '../interfaces/MemoryJS';
import { vec3 } from '../interfaces/Vector';
import { NETVARS, SIGNATURES } from '../utils/offsets';
import { AIMBOT_AIM_AT, AIMBOT_AIM_SMOOTH, AIMBOT_FOV } from '../utils/config';

function distance(x1: number, y1: number, x2: number, y2: number) {
    // Calculating distance
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0);
}

function getSmoothedValue(target: number, origin: number) {
    const differenceBetween2 = target - origin;
    const SumDifferenceWithMyOrigin = origin + differenceBetween2 / AIMBOT_AIM_SMOOTH;

    return SumDifferenceWithMyOrigin;
}

function AimbotAt(engine: IModule, target: vec3) {
    const localPlayer = getLocalPlayer();

    const dwClientStatePointer = ReadMemory(engine.modBaseAddr + SIGNATURES.dwClientState, "uint32");
    const viewAngles: vec3 = ReadMemory(dwClientStatePointer + SIGNATURES.dwClientState_ViewAngles, "vec3");

    const origin: vec3 = ReadMemory(localPlayer + NETVARS.m_vecOrigin, "vec3");
    const viewOffset: vec3 = ReadMemory(localPlayer + NETVARS.m_vecViewOffset, "vec3");

    const myPosition: vec3 = calcVector3WithOtherVector3(origin, viewOffset, "+");

    const deltaVec: vec3 = calcVector3WithOtherVector3(target, myPosition, "-");

    const deltaVecLength = Math.sqrt(deltaVec.x * deltaVec.x + deltaVec.y * deltaVec.y + deltaVec.z * deltaVec.z);

    const pitch = -Math.asin(deltaVec.z / deltaVecLength) * (180 / Math.PI);
    const yaw = Math.atan2(deltaVec.y, deltaVec.x) * (180 / Math.PI);

    const smoothedPitch = getSmoothedValue(pitch, viewAngles.x);
    const smoothedYaw = getSmoothedValue(yaw, viewAngles.y);

    const crosshairDistance = distance(viewAngles.x, viewAngles.y, pitch, yaw);

    if (crosshairDistance > AIMBOT_FOV) return;

    if (smoothedPitch >= -89 && smoothedPitch <= 89 && smoothedYaw >= -180 && smoothedYaw <= 180) {
        WriteMemory(dwClientStatePointer + SIGNATURES.dwClientState_ViewAngles, { x: smoothedPitch, y: smoothedYaw, z: viewAngles.z }, "vec3");
    }
}

export default function Aimbot(engine: IModule) {
    try {

        const localPlayer = getLocalPlayer();

        if (!localPlayer) return;

        const closestEnemy = getClosestPlayer();

        if (closestEnemy && playerIsSpotted(closestEnemy)) {
            const headPos = getBonePos(closestEnemy, AIMBOT_AIM_AT);

            AimbotAt(engine, headPos);
        }
    } catch (err) {
        console.error('Aimbot Error');
    }
}