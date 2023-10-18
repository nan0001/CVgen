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
  public widowSizeMedium$ = new BehaviorSubject<boolean>(
    window.innerWidth <= 992
  );

  constructor() {
    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth <= 576) {
        this.widowSizeMobile$.next(true);
        this.widowSizeSmall$.next(true);
        this.widowSizeMedium$.next(true);
        return;
      }

      if (window.innerWidth <= 768 && window.innerWidth > 576) {
        this.widowSizeMobile$.next(false);
        this.widowSizeSmall$.next(true);
        this.widowSizeMedium$.next(true);
        return;
      }

      if (window.innerWidth <= 992 && window.innerWidth > 768) {
        this.widowSizeMobile$.next(false);
        this.widowSizeSmall$.next(false);
        this.widowSizeMedium$.next(true);
        return;
      }

      this.widowSizeMobile$.next(false);
      this.widowSizeSmall$.next(false);
      this.widowSizeMedium$.next(false);
    });
  }
}
