import { view } from "./view";


//Creating out state with the tags inside the object (these are the main sections of our page)
export let state = {
    currentGoal: '',
    library: ['squats', 'deadlift',],
    logs: [],
}

//Creating out add work out function containing workout info in the object, 
//Then adding it into the state.log and calling the persist data function to save locally
 export const addWorkout = (name, note, isAligned) => {
 
     const newEntry = {
        id: Date.now(),
        name: name,
        note: note,
        isAligned: isAligned
    }

    state.logs.push(newEntry); 
    persistData();
}

//Creating a funcion that runs when the page opens. This function checks storage to see if "state" 
//Exists in memory. If no, this code block does not run. If yes, parse the data back into an oject
export const initModel = () => {
    const savedData = localStorage.getItem('state');

    if(savedData){
        const parsedData = JSON.parse(savedData);
        state.currentGoal = parsedData.currentGoal;
        state.library = parsedData.library;
        state.logs = parsedData.logs;

    }
}

//Function to save data locally
export const persistData = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

 //Function which adds our new goal to the state   
export const setGlobalGoal = (newGoal) => {
    state.currentGoal = newGoal;
    persistData();

}

//Creating function for user to add exercises to the library
export const addNewExercise = (newExercise) => {

    if(!state.library.includes(newExercise) && newExercise !== ''){
        state.library.push(newExercise);
        persistData();

    }   
}

//Creating a function which filters throgh the state logs for an id that matches the delete click 
// and removes it while keeping the others
export const deleteLog = (id) => {
state.logs = state.logs.filter((log) => log.id !== id);

persistData();
}




