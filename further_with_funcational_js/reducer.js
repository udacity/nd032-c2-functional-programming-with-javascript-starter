//reducer.js

// Image that you are creating an app to control a spaceship that uses Redux 
// We are building out the feature to control shields, and in this exercise we are writing the Shield reducer
// We want to handle the following types of events: damage shield (a reduction in sheild level) and repair shield (increase shield level)

// Remember that every type of event is boiled down to a single ACTION, we import the ones we need from the actions file
// also notice that the actions are all caps because they are CONSTANT values, or, immutable values
import { DAMAGE_SHIELD, REPAIR_SHIELD } from './actions'

// We set an initial state so that there is a value in state available, even before any actions have occured
const initialState = {
	shieldLevel: 100,
}

// the reducer takes in the current state (if available - if not then it defaults to the initial state) and an action
const shieldsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DAMAGE_SHIELD:
		
			// YOUR TURN: if the action object has a property called "amount", use destructuring to save that value to a const
			// YOUR CODE HERE
		
            let { shieldLevel } = state

            // YOUR TURN: You now have the shield level from state and amount of change from the action. Given that this is the DAMAGE_SHIELD reducer, write the logic to reflect what should happen
			// YOUR CODE HERE
			
            return {
                ...state,
                shieldLevel,
            }

        case REPAIR_SHIELD:
            
			// YOUR TURN: Using the reducer above as a template, fill in the contents of the REPAIR_SHIELD reducer
			
            return {
                ...state,
                shieldLevel,
            }
    }
}
