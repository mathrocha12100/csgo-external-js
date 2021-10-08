import Glow from './features/glow';
import Radar from './features/radar';
import RCS from './features/rcs';
import Triggerbot from './features/triggerbot';
import BunnyHop from './features/bunnyhop';
import Aimbot from './features/aimbot';

import aks from 'asynckeystate';

import { keys } from './utils/keys';

import { canRun } from './utils/config';
import { Global } from './functions/global';
import { MODULES } from './utils/offsets';

const express = require('express')
const app = express()
const port = 3569

MODULES.g = new Global();
MODULES.g.init();

app.get('/instance', async (req, res) => {
        
    async function execute() {

        let w = MODULES;
        console.log("Started.");
        let stop = false;
        while (!stop) {
            if (canRun('aimbot')) Aimbot(w.g.engineModule);
            if (canRun('glow')) Glow(w.g.clientModule);
            if (canRun('triggerbot')) Triggerbot(w.g.clientModule);
            if (canRun('bunnyhop')) BunnyHop(w.g.clientModule);
            if (canRun('radar'))  Radar();
            if (canRun('rcs')) RCS(w.g.engineModule);

            if (aks.getAsyncKeyState(keys.VK_END)) stop = true;
        }

    }

    await execute();

    res.send('<h1>Hello World!</h1>')
})    
  
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})
