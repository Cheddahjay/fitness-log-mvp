
//creating functions to get and reset form data inside of an object for easy export.
export const view = {
     getFormData: () => {
        return {
            name: document.getElementById('exercise-select').value,
            note: document.getElementById('notes-input').value,
            isAligned: document.getElementById('goal-align-check').checked
        }
    },

    clearForm: () => {
        document.getElementById('exercise-select').value = '',
        document.getElementById('goal-align-check').checked = false;
        
    },

    // going through each exercise within the library and creating a drop down option for it
    renderLibrary: (exercises) => {
        const select = document.querySelector('#exercise-select');
        select.innerHTML = '';

        exercises.forEach(exercise => {

            const option  = document.createElement('option');
            option.value = exercise
            option.textContent = exercise

            select.appendChild(option);
        })
      

    },
    
    renderGoal: (goal) => {
        const displayGoal = document.getElementById('display-goal');
        if(goal && goal.length > 0){
            displayGoal.innerHTML = `Current North Star: <span class= "highlight-goal">${goal}</span>`;
        }
        else{
            displayGoal.textContent = 'Set your Nort Star Goal'
        }
      
    },

    renderLogs: (logs) => {
        const entryLog = document.querySelector('#logs-container');
        if(!entryLog) return;

        entryLog.innerHTML = ''

        if(logs.length === 0){
            entryLog.innerHTML = `
            <div class= "no-results">
                 <p> No matching workouts.Try a different search! </p>
            </div>
            `;
            return;
        }

       logs.forEach((log) => {
          const cardContainer = document.createElement('div');
          cardContainer.className = 'log-card'

     cardContainer.innerHTML = ` 
            <div class="log-info">
                <h3>${log.name}</h3>
                <p>${log.note}</p>
                <small style="color: ${log.isAligned ? '#4caf50' : '#e74c3c'}; font-weight: bold;">
                    ${log.isAligned ? 'Target Hit ✓' : 'Off-track ✗'}
                </small>
            </div>
            <button class="delete-btn" data-id="${log.id}">Delete</button>
        `;
        entryLog.appendChild(cardContainer);
       })
    },

    updateStats: (count, percentage) => {
        const statCount = document.querySelector("#stat-count");
        const percentDisplay = document.querySelector("#alignment-percent");

        if(statCount) statCount.textContent = count;
        if(percentDisplay) percentDisplay.textContent = `${percentage}%`;


    }
}
 
