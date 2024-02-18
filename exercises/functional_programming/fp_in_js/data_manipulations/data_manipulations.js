var nearEarthObjects = require('./nasa_near_earth_object_API.json');

// The object in the nasa_near_earth_object_API.json is a copy of real API response from the NASA Near-Earth Object API. 
// Find the following from the API:

// Total Count ---------------------------------------------
// 1. How many near-earth objects did NASA register for the date of the search? Return the asteroid count.
const elementCount = nearEarthObjects.element_count;
console.log(elementCount)

// Averages ------------------------------------------------
// 2. What was the average absolute magnitude of all the near earth objects in this data set? Return the average absolute_magnitude_h.

const asteroids = Object.values(nearEarthObjects.near_earth_objects).flat();
const averageAbsMagnitude = asteroids
    .map(element => element.absolute_magnitude_h)
    .reduce((acc, currentValue, index, array) => {
        if (index + 1 == array.length) {
            return acc / array.length
        }

        return (acc += currentValue)
    })
console.log(averageAbsMagnitude)

// Hint - you can achieve this multiple ways, but the reduce method can be a little-known but cool way to find averages. To do it though, you'll need to use the initial_value argument
// For some extra challenge try using reduce with the initial setting argument. To learn more about it, take a look at this page: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce


// Hazardous -----------------------------------------------
// 3. A list of all objects (their id, name, max size in miles, and closest approach in miles) that are labeled potentially hazardous
//console.log(asteroids)
const hazardous = asteroids
    .filter(element => (element.is_potentially_hazardous_asteroid === true))
    .map(element => {
        return {
            id: element.id,
            name: element.name,
            max_size: element.estimated_diameter.miles.estimated_diameter_max,
            closestApproach: element.close_approach_data[0].miss_distance.miles
        }
    })


console.log(hazardous)

// Too Close for Comfort -----------------------------------
// 4. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles

const tooClose = asteroids
    .filter(element => (element.close_approach_data[0].miss_distance.miles < 900000))
    .map(element => {
        return {
            id: element.id,
            name: element.name,
            max_size: element.estimated_diameter.miles.estimated_diameter_max,
            closestApproach: element.close_approach_data[0].miss_distance.miles
        }
    })


console.log(tooClose)


// Alert ---------------------------------------------------
// 5. Of all the near-earth objects for this date, find the time that the asteroid with the nearest miss will be closest to earth. 

const alert = asteroids
    .map(element => {
        const time = element.close_approach_data[0].close_approach_date_full;
        const miss_distance = element.close_approach_data[0].miss_distance.miles;
        return {
            miss_distance: miss_distance,
            time: time
        }
    })
    .reduce((closest, current) => {
        const currDist = parseFloat(current.miss_distance);
        const closestDist = parseFloat(closest.miss_distance);
        if (currDist < closestDist)
        {
            return current;
        }
        else 
        {
            return closest;
        }

})

console.log(alert)