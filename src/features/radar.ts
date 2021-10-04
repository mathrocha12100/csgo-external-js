import { NETVARS } from '../utils/offsets';
import { IModule } from '../interfaces/MemoryJS';
import { WriteMemory } from '../functions/mem';
import { getLocalPlayer, getEntityByIndex, getEntityHealth, getMaxEntity } from '../functions/player';

export default function Radar() {
    try {
        const localPlayer = getLocalPlayer();   
        
        if (!localPlayer) return;

        for (let i = 1; i < getMaxEntity(); i++) {
            const entity = getEntityByIndex(i);

            if (entity && getEntityHealth(entity)) {
                WriteMemory(entity + NETVARS.m_bSpotted, 1, "int");
            }
        }

    } catch (err) {
        console.error('Radar error');
    }
}