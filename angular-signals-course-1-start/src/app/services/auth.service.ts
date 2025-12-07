import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpService = inject(HttpClient);
  private readonly userSignal = signal<User | null>(null);
  public readonly user = this.userSignal.asReadonly();
  public readonly isLoggedIn = computed(() => !!this.userSignal());

  async login(email: string, password: string): Promise<User> {
    const response$ = this.httpService.post<User>(`${environment.apiRoot}/login`, {email, password});
    const user = await firstValueFrom(response$);
    this.userSignal.set(user);
    return user;
  }
}
