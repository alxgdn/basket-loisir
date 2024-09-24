import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  // SESSION STORAGE
  public addToSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public getFromSessionStorage<TModel>(key: string) {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data) as TModel;
  }

  public clearSessionStorage(keys: string[] = null) {
    if (keys === null) {
      sessionStorage.clear();
    } else {
      keys.forEach(key => sessionStorage.removeItem(key));
    }
  }

  // LOCAL STORAGE
  public addToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromLocalStorage<TModel>(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data) as TModel;
  }

  public clearLocalStorage(keys: string[] = null) {
    if (keys === null) {
      localStorage.clear();
    } else {
      keys.forEach(key => localStorage.removeItem(key));
    }
  }
}
