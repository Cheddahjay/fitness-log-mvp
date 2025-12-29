//importing whatever functions/data we need from view and model
import {addWorkout, persistData, initModel, setGlobalGoal, state, addNewExercise, deleteLog} from './model.js';

import {view} from './view.js';

//initializing the function to display anything from local storage
initModel();


//calling renderlibray function to creat a dropdown for any exercise within the state library
view.renderLibrary(state.library);

//on submit we get the form data, add a workout card and clear the form
const workoutForm = document.getElementById('workout-form');
workoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = view.getFormData();

    addWorkout(formData.name, formData.note, formData.isAligned);
    view.renderLogs(state.logs)
    view.clearForm();
    refreshDashboard();
})

// Set goal button
const setGoalBtn = document.querySelector('#set-goal-button');

setGoalBtn.addEventListener('click', () => {
    const goalInput = document.querySelector('#goal-input');
    const newGoalValue = goalInput.value.trim();

    if(newGoalValue !== ''){
        setGlobalGoal(newGoalValue);

        view.renderGoal(state.currentGoal);

        goalInput.value = '';
    }
})


//Set new exercise button
const newExerciseBTn = document.querySelector('#add-exercise');

newExerciseBTn.addEventListener('click', ()  => {
    const newExercise = document.querySelector('#new-exercise-name');
    const exerciseName = newExercise.value

    if(exerciseName !== ''){
        addNewExercise(exerciseName)
        view.renderLibrary(state.library);
        view.clearForm()
    }
    newExercise.value = ''
    refreshDashboard();
})

//Creating an event listener on the card in order to allow deletion
document.querySelector('#logs-container').addEventListener('click', (event) => {

    if(event.target.classList.contains('delete-btn')){

        const idToDelete = Number(event.target.dataset.id);

        deleteLog(idToDelete);

        view.renderLogs(state.logs);

    }
    refreshDashboard();
})

//Creating a search bar in the side bar
const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('input', (event) => {

    const searchTerm = event.target.value.toLowerCase();
    const filteredLogs = state.logs.filter(log => {
        return  log.name.toLowerCase().includes(searchTerm) ||
                log.note.toLowerCase().includes(searchTerm);

    })
    view.renderLogs(filteredLogs);

})

//Creating a function which refreshing sidebar reflecting the workout count
const refreshDashboard = () => {
    view.renderLogs(state.logs);

    const total = state.logs.length;
    const aligned = state.logs.filter(log => log.isAligned).length;
    const percent = total > 0 ? Math.round((aligned/total) * 100) : 0;

    view.updateStats(total, percent);

}

view.renderLogs(state.logs)
view.renderGoal(state.currentGoal)
view.renderLibrary(state.library)
