import Glow from './features/glow';
import Radar from './features/radar';
import RCS from './features/rcs';
import Triggerbot from './features/triggerbot';
import BunnyHop from './features/bunnyhop';

import { getMem } from './functions/mem';

import { canRun } from './utils/config';

function execute() {
    const { clientModule, engineModule } = getMem();

    let stop = false;

    while (!stop) {
        if (canRun('glow')) Glow(clientModule);
        if (canRun('triggerbot')) Triggerbot(clientModule);
        if (canRun('bunnyhop')) BunnyHop(clientModule);
        if (canRun('radar'))  Radar();
        if (canRun('rcs')) RCS(engineModule);
    }
}

execute();