import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [data, setData] = useState({
        title: "",
        load: "",
        reps: ""
    });

    const HandleChange = (e) => {
        setData(
            {
                ...data,
                [e.target.id]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const workout = {
                title: data.title,
                load: data.load,
                reps: data.reps
            };

            const response = await fetch('http://localhost:4000/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(workout)
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error (errorData.message || 'Failed to create workout');
            }
            const newWorkout = await response.json();
            console.log('Workout created:', newWorkout);
            setData({
                title: "",
                load: "",
                reps: ""
            })
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: newWorkout
            })
        } 
        catch (error) {
            console.error('Error creating workout:', error);
        }
    }


    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label htmlFor="title">Exercise Title:</label>
            <input type = "text" id="title" value={data.title} 
            onChange = {HandleChange} />
            <label htmlFor="load">Load:</label>
            <input type = "number" id="load" value={data.load} 
            onChange = {HandleChange} />
            <label htmlFor="reps">Reps:</label>
            <input type = "number" id="reps" value={data.reps} 
            onChange = {HandleChange} />
            <button type="submit">Add Workout</button>
        </form>
     );
}
 
export default WorkoutForm;