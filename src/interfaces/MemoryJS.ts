export interface IOpenProcess {
    dwSize: number,
    th32ProcessID: number,
    cntThreads: number,
    th32ParentProcessID: number,
    pcPriClassBase: number,
    szExeFile: string,
    modBaseAddr: number,
    handle: number
};

export interface IModule {
    modBaseAddr: number,
    modBaseSize: number,
    szExePath: string,
    szModule: string,
    th32ProcessID: number
}

const types = [
    'byte',
    'int',
    'int32',
    'uint32',
    'int64',
    'uint64',
    'dword',
    'short',
    'long',
    'float',
    'double',
    'bool',
    'boolean',
    'ptr',
    'pointer',
    'str',
    'string',
    'vec3',
    'vector3',
    'vec4',
    'vector4',
] as const;

export type MemoryTypes = typeof types[number];