import { CHANGE_COUNT } from "../actions/jobAdvertisementsCount";
import { jobAdvertisementsCount } from "../initialValues/jobAdvertisementsCount";

const initialState = {
    jobAdvertisementsCount:jobAdvertisementsCount
}

export default function jobAdvertisementReducer(state = initialState, { type, payload }) {
    switch (type) {
      case CHANGE_COUNT:
        return {
            ...state,
            jobAdvertisementsCount: payload
        };
    default:
        return state;
    }
  }