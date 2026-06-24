import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
                    headers: { 'Authorization': `Bearer ${user.token}`}
                });
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
        if(user){
            fetchWorkouts();
        }
    }, [dispatch, user]);

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