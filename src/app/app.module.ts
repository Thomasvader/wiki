import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DocxComponent } from './docx/docx.component';
import { InterviewComponent } from './interview/interview.component';
import { CultureComponent } from './culture/culture.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { ApiService } from './service/apiService';
import { BypassSecurityTrustHtmlPipe } from './pipeline/DomSanitizer';
import { AppPropertiesPipe } from './pipeline/appProperties';
import { EncodeURIPipe } from './pipeline/encodeURI';

// Markdown

@NgModule({
  declarations: [
    AppComponent,
    DocxComponent,
    InterviewComponent,
    CultureComponent,
    FeaturesComponent,
    FooterComponent,
    BypassSecurityTrustHtmlPipe,
    AppPropertiesPipe,
    EncodeURIPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    // material component start
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    // material component end
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ApiService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
