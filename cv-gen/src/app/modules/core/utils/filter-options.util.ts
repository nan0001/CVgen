import { BehaviorSubject, Observable, take } from 'rxjs';

export function filterOptions(
  query: string,
  options$: Observable<string[] | null>,
  optionsFiltered$: BehaviorSubject<string[]>
): void {
  options$.pipe(take(1)).subscribe(val => {
    if (val) {
      const filteredArray = val.filter(elem =>
        elem.toLowerCase().includes(query.toLowerCase())
      );
      optionsFiltered$.next(filteredArray);
      return;
    }
    optionsFiltered$.next([]);
  });
}
