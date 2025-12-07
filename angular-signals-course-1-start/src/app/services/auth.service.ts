import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpService = inject(HttpClient);
  private readonly userSignal = signal<User | null>(null);
  private readonly router = inject(Router);
  public readonly user = this.userSignal.asReadonly();
  public readonly isLoggedIn = computed(() => !!this.userSignal());

  constructor() {
    effect(() => {
      this.loadedUserFromStorage();
      const user = this.userSignal();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  loadedUserFromStorage(): void {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (userJson) {
      const user = JSON.parse(userJson) as User;
      this.userSignal.set(user);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const response$ = this.httpService.post<User>(`${environment.apiRoot}/login`, { email, password });
    const user = await firstValueFrom(response$);

    this.userSignal.set(user);

    return user;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.userSignal.set(null);
    await this.router.navigate(['/login'])
  }
}
