import { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
const [workouts, setWorkouts] = useState([]);

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            try{
                const response = await fetch('http://localhost:4000/api/workouts');
                const data = await response.json();
                setWorkouts(data);
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
        </div>
     );
}
 
export default Home;