import { ARGB, RGB, Hex } from '../interfaces/Color';

function cleanHex(hexadecimal: Hex) {
    if (hexadecimal.search('#') != -1) return hexadecimal.split('#')[1];

    return hexadecimal;
}

export function convertHexToRGB(hexadecimal: Hex): RGB {
    const bigint = parseInt(cleanHex(hexadecimal), 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return { red, green, blue };
}

export function convertRGBToFloat(rgb: RGB): ARGB {
    return { red: rgb.red / 255.0, green: rgb.green / 255, blue: rgb.blue / 255, addressable: 1 };
}

export function HexColor(hexadecimal: Hex) {
    const rgbColor = convertHexToRGB(hexadecimal);

    return convertRGBToFloat(rgbColor);
}

export function RGBColor(rgb: RGB) {
    return convertRGBToFloat(rgb);
}