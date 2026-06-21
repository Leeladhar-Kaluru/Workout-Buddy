import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            try{
                const response = await fetch('http://localhost:4000/api/workouts');
                const data = await response.json();
                if(response.ok){
                    dispatch({
                        type: 'SET_WORKOUTS',
                        payload: data 
                    })
                }
            }
            catch(error){
                console.error("Error fetching workouts:", error);
            }
        }
        fetchWorkouts();
    }, [])

    return ( 
        <div>
            <h1>Home</h1>
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} id={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
     );
}
 
export default Home;