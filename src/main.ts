import Glow from './features/glow';
import Radar from './features/radar';
import RCS from './features/rcs';
import Triggerbot from './features/triggerbot';
import BunnyHop from './features/bunnyhop';
import Aimbot from './features/aimbot';

import aks from 'asynckeystate';

import { keys } from './utils/keys';

import { getMem } from './functions/mem';
import { canRun } from './utils/config';

function execute() {
    const { clientModule, engineModule } = getMem();

    let stop = false;

    while (!stop) {
        if (canRun('aimbot')) Aimbot(engineModule);
        if (canRun('glow')) Glow(clientModule);
        if (canRun('triggerbot')) Triggerbot(clientModule);
        if (canRun('bunnyhop')) BunnyHop(clientModule);
        if (canRun('radar'))  Radar();
        if (canRun('rcs')) RCS(engineModule);

        if (aks.getAsyncKeyState(keys.VK_END)) stop = true;
    }

    // process.exit(1);
}

execute();
