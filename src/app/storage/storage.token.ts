import { InjectionToken } from "@angular/core";
import { IStorage } from "./istorage";

export const STORAGE = new InjectionToken<IStorage>('STORAGE');