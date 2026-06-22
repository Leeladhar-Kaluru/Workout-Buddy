import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
                method: 'DELETE'
            });
            if(!response.ok){
                throw new Error('Failed to delete workout');
            }
            // Dispatch an action to remove the workout from the context
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: workout._id
            });
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    }

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created At: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>
        </div>
     );
}
 
export default WorkoutDetails;