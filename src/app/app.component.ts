import { Component, HostListener } from '@angular/core';
import screenfull from 'screenfull';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gman.io';

  @HostListener('window:click')
  activateFullscreen() {
    if ( screenfull.enabled ) {
      screenfull.request();
    }
  }
}
