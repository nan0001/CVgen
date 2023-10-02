import { createReducer, on } from '@ngrx/store';
import { CvActions } from './cv.actions';
import {
  CvInterface,
  CvProjectType,
  CvWithProjects,
} from '../../core/models/cv.models';

export interface CvState {
  cvs: CvInterface[];
  cvsWithProjects: CvWithProjects[];
  isLoading: boolean;
}

export const initialState: CvState = {
  cvs: [],
  cvsWithProjects: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(CvActions.loadCvs, (state): CvState => ({ ...state, isLoading: true })),
  on(
    CvActions.successLoading,
    (state, action): CvState => ({
      ...state,
      cvs: action.data,
      isLoading: false,
    })
  ),
  on(
    CvActions.loadingFailure,
    (state): CvState => ({ ...state, cvs: [], isLoading: false })
  ),
  on(CvActions.updateProjects, (state, action): CvState => {
    const stateCvsWithProjects = state.cvs.map(cv => {
      const projectsArray: CvProjectType[] = [];
      cv.projects.forEach(proj => {
        const foundProj = action.data.find(val => val.id === proj.id);
        if (foundProj) {
          const fullProj = {
            ...proj,
            ...foundProj,
          };
          projectsArray.push(fullProj);
        }
      });

      const updatedCv = {
        ...cv,
        projects: projectsArray,
      };
      return updatedCv;
    });

    return {
      ...state,
      cvsWithProjects: stateCvsWithProjects,
    };
  })
);
