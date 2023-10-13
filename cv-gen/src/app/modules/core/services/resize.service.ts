import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  public widowSizeMobile$ = new BehaviorSubject<boolean>(
    window.innerWidth <= 576
  );
  public widowSizeSmall$ = new BehaviorSubject<boolean>(
    window.innerWidth <= 768
  );

  constructor() {
    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth <= 576) {
        this.widowSizeMobile$.next(true);
        this.widowSizeSmall$.next(true);
        return;
      }

      if (window.innerWidth <= 768 && window.innerWidth > 576) {
        this.widowSizeSmall$.next(true);
        this.widowSizeMobile$.next(false);
        return;
      }

      this.widowSizeSmall$.next(false);
      this.widowSizeMobile$.next(false);
    });
  }
}
