import { vec3, vec2, vec4 } from '../interfaces/Vector';

export function Vector2(value?: vec2) {
    return value || { x: 0, y: 0 };
}

export function Vector3(value?: vec3) {
    return value || { x: 0, y: 0, z: 0};
}

export function Vector4(value: vec4) {
    return value || { x: 0, y: 0, z: 0, w: 0 };
}

export function calcVector3WithOtherValue(vector3: vec3, value: number, operation: '+' | '-' | '/' | '*') { 
    switch (operation) {
        case '*': {
            return { x: vector3.x * value, y: vector3.y * value, z: vector3.z * value };
        }
        case '+': {
            return { x: vector3.x + value, y: vector3.y + value, z: vector3.z + value };
        }
        case '-': {
            return { x: vector3.x - value, y: vector3.y - value, z: vector3.z - value };
        }
        case '/': {
            return { x: vector3.x / value, y: vector3.y / value, z: vector3.z / value };
        }
        default:
    }
}

export function calcVector3WithOtherVector3(vector3: vec3, otherVector3: vec3, operation: '+' | '-' | '/' | '*') { 
    switch (operation) {
        case '*': {
            return { x: vector3.x * otherVector3.x, y: vector3.y * otherVector3.y, z: vector3.z * otherVector3.z };
        }
        case '+': {
            return { x: vector3.x + otherVector3.x, y: vector3.y + otherVector3.y, z: vector3.z + otherVector3.z };
        }
        case '-': {
            return { x: vector3.x - otherVector3.x, y: vector3.y - otherVector3.y, z: vector3.z - otherVector3.z };
        }
        case '/': {
            return { x: vector3.x / otherVector3.x, y: vector3.y / otherVector3.y, z: vector3.z / otherVector3.z };
        }
        default:
    }
}

export function sumVector3(vector3: vec3, vec3ToSum: vec3) {
    return { x: vector3.x + vec3ToSum.x, y: vector3.y + vec3ToSum.y, z: vector3.z + vec3ToSum.z };
}

export function subVector3(vector3: vec3, vec3ToSub: vec3) {
    return { x: vector3.x - vec3ToSub.x, y: vector3.y - vec3ToSub.y, z: vector3.z - vec3ToSub.z };
}

export function NormalizeVector3(vector3: vec3) {
    while(vector3.y < -180)  {
        vector3.y += 360;
    }
    while (vector3.y > 180) {
        vector3.y -= 360;
    }

    if (vector3.x > 89) {
        vector3.x = 89;
    }

    if (vector3.x < -89) {
        vector3.x = -89;
    }
}