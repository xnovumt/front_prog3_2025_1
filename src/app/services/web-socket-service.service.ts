import { environment } from 'src/environments/environment';
import { SeguridadService } from './seguridadService/seguridad.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  callback: EventEmitter<any> = new EventEmitter();
  nameEvent: string;

  constructor(private seguridadService: SeguridadService) {
    super({
      url: environment.url_ms_cinema,
      options: {
        query: {
          "user_id": seguridadService.usuarioSesionActiva?.email || ''
        }
      }
    });

    this.nameEvent = "";
  }

  setNameEvent(nameEvent: string) {
    this.nameEvent = nameEvent;
    this.listen();
  }

  listen = () => {
    this.ioSocket.on(this.nameEvent, (res: any) => this.callback.emit(res));
  }

  emitEvent = (payload = {}) => {
    this.ioSocket.emit(this.nameEvent, payload);
  }

}
