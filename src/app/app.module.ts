import { LOCALE_ID, NgModule } from '@angular/core';
import fr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService } from './services/authentification.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SpringWeiModule } from './components/components.module';
import { ActivitesService } from './services/activites.service';
import { ActuService } from './services/actu.service';
import { OlympiadesService } from './services/olympiades.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { InterfaceService } from './services/interface.service';
import { registerLocaleData } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { NotificationsService } from './providers/notifications.service';
import { HttpClientModule } from '@angular/common/http';
import { BungalowService } from './services/bungalow.service';
import { AdminService } from './services/admin.service';
import { SystemService } from './services/system.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

registerLocaleData(fr);

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot({
			mode: 'md'
		}),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		SpringWeiModule,
		ReactiveFormsModule,
		IonicStorageModule.forRoot(),
		HttpClientModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AuthentificationService,
		ActivitesService,
		ActuService,
		OlympiadesService,
		AuthGuardService,
		InterfaceService,
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		Camera,
		FCM,
		NotificationsService,
		BungalowService,
		AdminService,
		SystemService,
		InAppBrowser,
		CallNumber,
		AppVersion
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
