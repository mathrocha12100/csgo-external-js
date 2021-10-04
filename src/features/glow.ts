import { IModule } from '../interfaces/MemoryJS';
import { NETVARS, SIGNATURES } from '../utils/offsets';
import { getEntityByIndex, getEntityHealth, getLocalPlayer, getPlayerColor, isEnemy } from '../functions/player';
import { WriteMemory, ReadMemory } from '../functions/mem';

import { HexColor } from '../functions/color';

const ally = HexColor('#08ff08');
const enemy = HexColor('#de0429');

const allySpotted = HexColor('#08ff08');
const enemySpotted = HexColor('#fa3759');

function drawGlow(glowManager: any, entityGlow: any, entity: number) {
    if (!glowManager || !entityGlow) return;

    const color = isEnemy(entity) ? getPlayerColor(entity, enemy, enemySpotted) : getPlayerColor(entity, ally, allySpotted);

    WriteMemory(glowManager + entityGlow * 0x38 + 0x8, color.red, "float") //RED
    WriteMemory(glowManager + entityGlow * 0x38 + 0xC, color.green, "float");//GREEN
    WriteMemory(glowManager + entityGlow * 0x38 + 0x10, color.blue, "float");//BLUE

    WriteMemory(glowManager + entityGlow * 0x38 + 0x14, color.addressable, "float"); //ADRESSABLE

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

                drawGlow(glowManager, entityGlow, entity);
            }
        }
    } catch (err) {
        console.error('Glow Error');
    }
}
