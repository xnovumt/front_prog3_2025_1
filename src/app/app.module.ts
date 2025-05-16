import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

// Estas importaciones parecen estar bien ahora (para chats y manejo genérico)
import { ListChatComponent } from './pages/ms-pages/chats/list/list.component';
import { ManageComponent } from './pages/ms-pages/chats/manage/manage.component';

// ELIMINA ESTA LÍNEA: Este componente de theaters ya está declarado en TheatersModule
// import { ListComponent } from './layouts/theaters/list/list.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    // Deja ListChatComponent y ManageComponent si son componentes que declaras aquí
    ListChatComponent,
    ManageComponent,

    // ELIMINA ESTA LÍNEA: Este componente de theaters ya está declarado en TheatersModule
    // ListComponent // <-- ELIMINA ESTA DECLARACIÓN
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }