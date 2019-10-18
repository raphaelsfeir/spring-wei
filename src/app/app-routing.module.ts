import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },


	{ path: 'index', loadChildren: './index/index.module#IndexPageModule', canActivate: [AuthGuardService] },


	{ path: 'actualites', loadChildren: './actualites/actu/actu.module#ActuPageModule', canActivate: [AuthGuardService] },
	{ path: 'actualites/admin', loadChildren: './actualites/admin/admin.module#AdminPageModule', canActivate: [AuthGuardService] },
	{ path: 'actualites/admin/:id', loadChildren: './actualites/admin/admin.module#AdminPageModule', canActivate: [AuthGuardService] },
	{ path: 'actualites/single/:id', loadChildren: './actualites/actu/single/single.module#SinglePageModule', canActivate: [AuthGuardService] },


	{ path: 'olympiades', loadChildren: './olympiades/olympiades.module#OlympiadesPageModule', canActivate: [AuthGuardService] },
	{ path: 'olympiades/admin', loadChildren: './olympiades/admin/admin.module#AdminPageModule', canActivate: [AuthGuardService] },
	{ path: 'olympiades/admin/edit/:id', loadChildren: './olympiades/admin/edit/edit.module#EditPageModule', canActivate: [AuthGuardService] },


	{ path: 'auth', loadChildren: './auth/login/login.module#LoginPageModule' },
	{ path: 'auth/login', loadChildren: './auth/login/login.module#LoginPageModule' },
	{ path: 'auth/forgotten-password', loadChildren: './auth/forgotten-password/forgotten-password.module#ForgottenPasswordPageModule' },


	{ path: 'user', loadChildren: './user/profil/profil.module#ProfilPageModule', canActivate: [AuthGuardService] },
	{ path: 'user/bungalow', loadChildren: './user/bungalow/bungalow.module#BungalowPageModule', canActivate: [AuthGuardService] },
	{ path: 'user/bungalow/respo', loadChildren: './user/bungalow/respo/respo.module#RespoPageModule', canActivate: [AuthGuardService] },
	{ path: 'user/bungalow/map', loadChildren: './user/bungalow/map/map.module#MapPageModule', canActivate: [AuthGuardService] },
	{ path: 'user/edit', loadChildren: './user/profil/edit/edit.module#EditPageModule', canActivate: [AuthGuardService] },


	{ path: 'wei/activites', loadChildren: './wei/activites/activites.module#ActivitesPageModule', canActivate: [AuthGuardService] },
	{ path: 'wei/activites/admin', loadChildren: './wei/activites/admin/admin.module#AdminPageModule', canActivate: [AuthGuardService] },
	{ path: 'wei/activites/admin/edit/:jour/:id', loadChildren: './wei/activites/admin/edit/edit.module#EditPageModule', canActivate: [AuthGuardService] },
	{ path: 'wei/informations', loadChildren: './wei/informations/informations.module#InformationsPageModule', canActivate: [AuthGuardService] },
	{ path: 'wei/activites/tabs/vendredi', loadChildren: './wei/activites/vendredi/vendredi.module#VendrediPageModule' },
	{ path: 'wei/activites/tabs/samedi', loadChildren: './wei/activites/samedi/samedi.module#SamediPageModule' },
	{ path: 'wei/activites/tabs/dimanche', loadChildren: './wei/activites/dimanche/dimanche.module#DimanchePageModule' },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminPageModule', canActivate: [AuthGuardService] },

	{ path: 'admin/billets', loadChildren: './admin/billets/billets.module#BilletsPageModule' },
	{ path: 'admin/utilisateurs', loadChildren: './admin/utilisateurs/utilisateurs.module#UtilisateursPageModule' },
	{ path: 'admin/bureau', loadChildren: './admin/bureau/bureau.module#BureauPageModule' },

	{ path: 'first-launch', loadChildren: './first-launch/first-launch.module#FirstLaunchPageModule', canActivate: [AuthGuardService] },
  { path: 'user/billet', loadChildren: './user/billet/billet.module#BilletPageModule', canActivate: [AuthGuardService] },


];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
