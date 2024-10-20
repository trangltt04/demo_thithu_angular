import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'product/list',
    canActivate: [adminGuard],
    component: ProductListComponent,
  },
  {
    path: 'product/add',
    canActivate: [adminGuard],
    component: ProductAddComponent,
  },
  {
    path: 'product/edit/:id',
    canActivate: [adminGuard],
    component: ProductEditComponent,
  },
];
