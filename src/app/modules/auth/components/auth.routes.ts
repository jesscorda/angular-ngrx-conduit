import { Route } from "@angular/router";
import { AuthRoutes } from "../constants/auth-routes.enum";

export const AUTH_ROUTES: Route[] = [
  {
    path: AuthRoutes.Login,
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: AuthRoutes.RegisterUser,
    loadComponent: () => import('./register-user/register-user.component').then(c => c.RegisterUserComponent)
  },
  { path: '', redirectTo: AuthRoutes.Login, pathMatch: 'full' },
]
