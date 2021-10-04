import Glow from './features/glow';
import Radar from './features/radar';
import RCS from './features/rcs';
import Triggerbot from './features/triggerbot';

import { getMem } from './functions/mem';

function execute() {
    const { clientModule, engineModule, process } = getMem();

    let stop = false;

    while (!stop) {
        Glow(clientModule);
        Triggerbot(clientModule);
        Radar();
        RCS(engineModule);
    }
}

execute();