import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, combineLatest } from 'rxjs';
import { EntitiesActions } from '../actions/entities.actions';
import { EntitiesService } from '../../services/entities.service';
import { Store } from '@ngrx/store';
import { selectEntities } from '../selectors/entities.selectors';
import { FirestoreError } from '@angular/fire/firestore';

@Injectable()
export class EntitiesEffects {
  public loadEntities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntitiesActions.loadEntities),
      switchMap(() => {
        const langs$ = this.entitiesService.getEntityList('langs');
        const skills$ = this.entitiesService.getEntityList('skills');
        const resps$ = this.entitiesService.getEntityList('responsibilities');

        const entitiesCollection$ = combineLatest([langs$, skills$, resps$]);

        const entitiesAction$ = entitiesCollection$.pipe(
          map(response => {
            const data = {
              langs: response[0] ? response[0] : [],
              skills: response[1] ? response[1] : [],
              responsibilities: response[2] ? response[2] : [],
            };
            return EntitiesActions.successLoading({ ...data });
          }),
          catchError((errorResponse: FirestoreError) => {
            console.warn(errorResponse);
            return of(EntitiesActions.loadingFailure());
          })
        );

        return entitiesAction$;
      })
    );
  });

  public deleteEntitiesItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntitiesActions.deleteItem),
      concatLatestFrom(() => this.store.select(selectEntities)),
      switchMap(([action, entitiesState]) => {
        const list = entitiesState[action.list];
        if (list.includes(action.item)) {
          const deleteItem$ = this.entitiesService.deleteEntity(
            action.item,
            action.list
          );

          const entitiesAction$ = deleteItem$.pipe(
            map(() => {
              return EntitiesActions.loadEntities();
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);
              return of(EntitiesActions.loadingFailure());
            })
          );

          return entitiesAction$;
        }

        return of(EntitiesActions["itemDoesn'tExist"]());
      })
    );
  });

  public addEntitiesItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EntitiesActions.addItem),
      concatLatestFrom(() => this.store.select(selectEntities)),
      switchMap(([action, entitiesState]) => {
        const list = entitiesState[action.list];
        if (!list.includes(action.item)) {
          const addItem$ = this.entitiesService.addEntity(
            action.item,
            action.list
          );

          const entitiesAction$ = addItem$.pipe(
            map(() => {
              return EntitiesActions.loadEntities();
            }),
            catchError((errorResponse: FirestoreError) => {
              console.warn(errorResponse);
              return of(EntitiesActions.loadingFailure());
            })
          );

          return entitiesAction$;
        }

        return of(EntitiesActions.itemAlreadyExists());
      })
    );
  });

  constructor(
    private actions$: Actions,
    private entitiesService: EntitiesService,
    private store: Store
  ) {}
}
