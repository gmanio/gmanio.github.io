import { Component, HostListener } from '@angular/core';
import * as fullscreen from 'screenfull';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gman.io';

  @HostListener('window:click')
  activateFullscreen () {
    if (fullscreen && fullscreen.enabled) {
      fullscreen.request();
    }
  }
}
