import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopPageComponent } from './top-page/top-page.component';
import { CompteModule } from './compte/compte.module';

@NgModule({
  declarations: [
    AppComponent,
    TopPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CompteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
