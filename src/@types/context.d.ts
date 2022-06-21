export interface IElectronAPI {
  update: (count: number) => void;
}

declare global {
  interface Window {
    myAPI: IElectronAPI;
  }
}

declare const API_URL: string;
