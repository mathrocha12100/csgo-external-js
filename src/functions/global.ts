import { getProcesses } from "memoryjs";
import { MODULES } from "../utils/offsets";
import { getMem } from "./mem";

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export class Global {

    process = null;
    clientModule = null;
    engineModule = null;

    constructor () {
        this.init = this.init.bind(this);
    }

    async init() {

        (async () => {

            let processes = getProcesses();
            while (!processes.find((f) => f.szExeFile == MODULES.game)) {
        
                processes = getProcesses();
                console.log("can't find csgo.exe process")
                await sleep(100);
            }

            await sleep(30000);

            const obj = getMem();
            this.process = obj.process
            this.clientModule = obj.clientModule
            this.engineModule = obj.engineModule
        
        })()

    }

}