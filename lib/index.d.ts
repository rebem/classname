export interface BEMEntity {
    tag?: string;
    block?: string;
    elem?: string;
    mods?: {
        [key: string]: string | number | boolean;
    };
    mix?: BEMEntity | BEMEntity[];
    className?: string;
}

export declare function stringify(entity: BEMEntity): string;
