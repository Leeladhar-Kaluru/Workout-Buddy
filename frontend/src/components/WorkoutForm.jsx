import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [data, setData] = useState({
        title: "",
        load: "",
        reps: ""
    });
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        try {
            const workout = {
                title: data.title,
                load: data.load,
                reps: data.reps
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(workout)
            });

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.error || "Failed to create workout");
                setEmptyFields(responseData.emptyFields || []);
                return;
            }

            setError(null);
            setEmptyFields([]);
            setData({
                title: "",
                load: "",
                reps: ""
            });

            dispatch({
                type: "CREATE_WORKOUT",
                payload: responseData
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label htmlFor="title">Exercise Title:</label>
            <input
                type="text"
                id="title"
                value={data.title}
                onChange={handleChange}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label htmlFor="load">Load:</label>
            <input
                type="number"
                id="load"
                value={data.load}
                onChange={handleChange}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label htmlFor="reps">Reps:</label>
            <input
                type="number"
                id="reps"
                value={data.reps}
                onChange={handleChange}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            {error && <p>{error}</p>}

            {emptyFields.length > 0 && (
                <p>Please fill in the following fields: {emptyFields.join(", ")}</p>
            )}

            <button type="submit">Add Workout</button>
        </form>
    );
};

export default WorkoutForm;