import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/home/components/main-page/main-page.component';
import { authGuard } from './modules/core/guards/auth.guard';
import { NotFoundComponent } from './modules/home/components/not-found/not-found.component';
import { WelcomeComponent } from './modules/home/components/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', pathMatch: 'full', component: WelcomeComponent },
      {
        path: 'employees',
        canMatch: [authGuard],
        loadChildren: () =>
          import('./modules/employees/employees.module').then(
            m => m.EmployeesModule
          ),
      },
      {
        path: 'projects',
        canMatch: [authGuard],
        loadChildren: () =>
          import('./modules/projects/projects.module').then(
            m => m.ProjectsModule
          ),
      },
      {
        path: 'entities',
        canMatch: [authGuard],
        loadChildren: () =>
          import('./modules/entities/entities.module').then(
            m => m.EntitiesModule
          ),
      },
      { path: 'not-found', component: NotFoundComponent },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
