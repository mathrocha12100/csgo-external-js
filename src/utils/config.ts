import { keys } from './keys';
import aks from 'asynckeystate';

function config(enabled: boolean, key?: keyof typeof keys) {
    return { enabled, key: keys[key] };
}

export const configs = {
    aimbot: config(true, "VK_XBUTTON1"),
    bunnyhop: config(true, "VK_SPACE"),
    triggerbot: config(true, "VK_XBUTTON2"),
    glow: config(true),
    radar: config(true),
    rcs: config(true),
};

export function canRun(config: keyof typeof configs) {
    const conf = configs[config];

    if (conf.key) {
        return aks.getAsyncKeyState(conf.key) && conf.enabled;
    }

    return conf.enabled;
}