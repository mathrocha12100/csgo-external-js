import { ReadMemory, WriteMemory } from '../functions/mem';
import { isEnemy, getLocalPlayer, getEntityByIndex } from '../functions/player';
import { IModule } from '../interfaces/MemoryJS';
import { NETVARS, SIGNATURES } from '../offsets/offsets';

export default function Triggerbot(client: IModule) {
    try {
        const localEntity = getLocalPlayer();

        if (!localEntity) return;

        const crosshairId = ReadMemory(localEntity + NETVARS.m_iCrosshairId, "int");
        const ent = getEntityByIndex(crosshairId - 1);

        if (crosshairId && ent && localEntity) {
            if (crosshairId > 0 && crosshairId <= 64 && isEnemy(ent)) {
                WriteMemory(client.modBaseAddr + SIGNATURES.dwForceAttack, 6, "int");
            }
        }
    } catch (err) {
        console.error('Trigger Error')
    }
}