import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(
      {
        apiKey: 'AIzaSyDRWE7S7O8CAz2h2FHE1HFG1le-dy7yxfY',
        authDomain: 'basket-loisir-e29a0.firebaseapp.com',
        projectId: 'basket-loisir-e29a0',
        storageBucket: 'basket-loisir-e29a0.appspot.com',
        messagingSenderId: '21216025081',
        appId: '1:21216025081:web:a47a5b2fcc3f4ff54dc528',
      },
    )),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
