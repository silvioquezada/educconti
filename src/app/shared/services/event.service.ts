import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  $emitter = new EventEmitter();

    emitEvent() {
        this.$emitter.emit();
    }   

}
