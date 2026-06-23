/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLEADS_APPS_SCRIPT_URL: string;
  readonly VITE_SHEET_ID: string;
  readonly VITE_SHEET_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
