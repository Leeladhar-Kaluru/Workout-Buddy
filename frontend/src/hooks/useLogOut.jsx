import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export const useLogOut = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workOutsDispatch } = useWorkoutsContext();

    const logOut = () => {
        //remove user from local storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({type: 'LOGOUT'});
        workOutsDispatch({type: 'SET_WORKOUTS', payload: null});
    }

    return { logOut };
}