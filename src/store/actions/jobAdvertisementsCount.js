export const CHANGE_COUNT = "CHANGE_COUNT"

export function changeCount(count){
    return {
        type : CHANGE_COUNT,
        payload: count
    }
}
