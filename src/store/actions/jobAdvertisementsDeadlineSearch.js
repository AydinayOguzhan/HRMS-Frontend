export const SEARCH_DEADLINE = "SEARCH_DEADLINE"

export function searchDeadline(deadline){
    return {
        type : SEARCH_DEADLINE,
        payload: deadline
    }
}
