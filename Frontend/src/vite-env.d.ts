// / <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_BASEURL: string;
    VITE_PORT: string;
}
    
interface ImportMeta {
    env: ImportMetaEnv;
}