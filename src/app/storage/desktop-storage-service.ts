import { Injectable } from "@angular/core";
import { IStorage } from "./istorage";

@Injectable()
export class DesktopStorageService implements IStorage {
  private storage: Map<string, string> = new Map();
  
  // Utiliser localStorage ou fichier selon votre besoin
  getItem(key: string): string | null {
    // Avec Electron : localStorage ou fichier
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}