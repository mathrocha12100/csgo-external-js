import { IModule } from '../interfaces/MemoryJS';
import { NETVARS, SIGNATURES } from '../utils/offsets';
import { getEntityByIndex, getEntityHealth, getLocalPlayer } from '../functions/player';
import { WriteMemory, ReadMemory } from '../functions/mem';

const color = [0.7, 0.0, 0.7, 0.6];

function drawGlow(glowManager: any, entityGlow: any) {
    if (!glowManager || !entityGlow) return;

    WriteMemory(glowManager + entityGlow * 0x38 + 0x8, color[0], "float");
    WriteMemory(glowManager + entityGlow * 0x38 + 0xC, color[1], "float");
    WriteMemory(glowManager + entityGlow * 0x38 + 0x10, color[2], "float");
    WriteMemory(glowManager + entityGlow * 0x38 + 0x14, color[3], "float");
    WriteMemory(glowManager + entityGlow * 0x38 + 0x28, 1, "int");
}

export default function Glow(client: IModule) {

    try {
        const localPlayer = getLocalPlayer();
        
        if (!localPlayer) return;

        const glowManager = ReadMemory(client.modBaseAddr + SIGNATURES.dwGlowObjectManager, "int");


        for (let i = 1; i < 64; i++) {
            const entity = getEntityByIndex(i);

            if (entity && getEntityHealth(entity)) {
                const entityGlow = ReadMemory(entity + NETVARS.m_iGlowIndex, "int");

                drawGlow(glowManager, entityGlow);
            }
        }
    } catch (err) {
        console.error('Glow Error');
    }
}
