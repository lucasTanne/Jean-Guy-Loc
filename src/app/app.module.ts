import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopPageComponent } from './top-page/top-page.component';
import { CompteModule } from './compte/compte.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BottomPageComponent } from './bottom-page/bottom-page.component';
import { AccueilModule } from './accueil/accueil.module';
import { LocationsModule } from './locations/locations.module';
import { ContactComponent } from './contact/contact/contact.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';



@NgModule({
  declarations: [
    AppComponent,
    TopPageComponent,
    BottomPageComponent,
    ContactComponent,
    UtilisateurComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CompteModule,
    FontAwesomeModule,
    AccueilModule,
    LocationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
