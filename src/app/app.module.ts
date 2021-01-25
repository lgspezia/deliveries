import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SettlementListComponent } from './components/settlement-list/settlement-list.component';
import { SettlementsDetailComponent } from './components/settlement-detail/settlement-detail.component';
import { SettlementNotFoundComponent } from './components/settlement-not-found/settlement-not-found.component';
import { CardSettlementComponent } from './components/card-settlement/card-settlement.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { LogoSettlementComponent } from './components/logo-settlement/logo-settlement.component';
import { TitleSectionComponent } from './components/title-section/title-section.component';
import { CpfCnpjDirective } from './directives/cpf-cnpj.directive';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'settleDb',
  version: 1,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  }]
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettlementListComponent,
    SettlementsDetailComponent,
    SettlementNotFoundComponent,
    CardSettlementComponent,
    BackButtonComponent,
    LogoSettlementComponent,
    TitleSectionComponent,
    CpfCnpjDirective,
    ModalMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
