export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
type JWTUSER = {
    userId: string;
    role?: string;
};
type optionsType = {
    expiresIn: string | number;
};
export declare const createJwt: (user: JWTUSER, options: optionsType) => string;
export declare const verifyJwt: (token: string) => {
    userId: string;
};
export {};
