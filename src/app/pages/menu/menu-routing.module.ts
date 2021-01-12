import { PreferencesPageModule } from './../preferences/preferences.module';
import { HomePageModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
        // loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'preferences',
        loadChildren: () => import('../preferences/preferences.module').then(m => m.PreferencesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
