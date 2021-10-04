import { ReadMemory, WriteMemory } from '../functions/mem';
import { getLocalPlayer } from '../functions/player';
import { IModule } from '../interfaces/MemoryJS';
import { NETVARS, SIGNATURES } from '../utils/offsets';

export default function BunnyHop(client: IModule) {
    try {
        const localPlayer = getLocalPlayer();
        const fFlags = ReadMemory(localPlayer + NETVARS.m_fFlags, "int");

        if (fFlags == 256) {
            WriteMemory(client.modBaseAddr + SIGNATURES.dwForceJump, 4, "int");
        } else {
            WriteMemory(client.modBaseAddr + SIGNATURES.dwForceJump, 5, "int");
        }

    } catch (err) {
        console.error('BunnyHop Error');
    } 
}