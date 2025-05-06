declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HASHING_SECRET_KEY: string;
        }
    }
}

export {};
