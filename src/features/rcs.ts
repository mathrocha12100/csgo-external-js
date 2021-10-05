import { getLocalPlayer } from '../functions/player';
import { ReadMemory, WriteMemory } from '../functions/mem';
import { SIGNATURES, NETVARS } from '../utils/offsets';
import { vec3 } from '../interfaces/Vector';
import { Vector3, calcVector3WithOtherVector3, NormalizeVector3, calcVector3WithOtherValue } from '../functions/vector';
import { IModule } from '../interfaces/MemoryJS';

let oPunch = Vector3();

export default function RCS(engine: IModule) {
    try {
        const entity = getLocalPlayer();

        if (!entity) return;

        const dwClientStatePointer = ReadMemory(engine.modBaseAddr + SIGNATURES.dwClientState, "uint32");
        const viewAngles: vec3 = ReadMemory(dwClientStatePointer + SIGNATURES.dwClientState_ViewAngles, "vec3");

        if (!viewAngles) return;

        const shotsFired = ReadMemory(entity + NETVARS.m_iShotsFired, "int");
        const punchAngleVal: vec3 = ReadMemory(entity + NETVARS.m_aimPunchAngle, "vec3");
        const punchAngleVec: vec3 = calcVector3WithOtherValue(punchAngleVal, 2, '*');

        if (shotsFired > 1) {
            let newAngle: vec3 = calcVector3WithOtherVector3(calcVector3WithOtherVector3(viewAngles, oPunch, '+'), punchAngleVec, '-');

            NormalizeVector3(newAngle);

            WriteMemory(dwClientStatePointer + SIGNATURES.dwClientState_ViewAngles, newAngle, "vec3");
        }

        oPunch = punchAngleVec;
    } catch (err) {
        console.error('RCS Error');
    }
}