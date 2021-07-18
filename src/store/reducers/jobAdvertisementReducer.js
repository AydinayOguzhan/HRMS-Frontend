import { CHANGE_COUNT } from "../actions/jobAdvertisementsCount";
import { SEARCH_DEADLINE } from "../actions/jobAdvertisementsDeadlineSearch";
import { jobAdvertisementsCount } from "../initialValues/jobAdvertisementsCount";
import { jobAdvertisementsDeadline } from "../initialValues/jobAdvertisementsDeadlineSearch";

const initialState = {
    jobAdvertisementsCount: jobAdvertisementsCount,
    jobAdvertisementsDeadline:jobAdvertisementsDeadline
}

export default function jobAdvertisementReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_COUNT:
            return {
                ...state,
                jobAdvertisementsCount: payload
            };
        case SEARCH_DEADLINE:
            return{
                ...state,
                jobAdvertisementsDeadline: payload
            }
        default:
            return state;
    }
}