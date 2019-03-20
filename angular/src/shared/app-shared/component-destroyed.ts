import { Subject } from 'rxjs';

interface OnDestroyLike {
  ngOnDestroy(): void;
}

export function componentDestroyed(component: OnDestroyLike): any {
  const oldNgOnDestroy = component.ngOnDestroy;
  const stop$ = new Subject();
  component.ngOnDestroy = function () {
    oldNgOnDestroy && oldNgOnDestroy.apply(component);
    stop$.next(undefined);
    stop$.complete();
  };
  return stop$;
}
