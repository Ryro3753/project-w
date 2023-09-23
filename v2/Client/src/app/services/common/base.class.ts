import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable()
export abstract class BaseClass implements OnDestroy {

  public _destroy$: Subject<void> = new Subject();
  
  ngOnDestroy(): void {
    this.clearDestroy$();
  }

  clearDestroy$() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}

