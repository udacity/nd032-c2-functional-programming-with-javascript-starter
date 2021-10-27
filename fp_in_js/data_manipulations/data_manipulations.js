var nearEarthObjects = require('./nasa_near_earth_object_API.json');

// The object in the nasa_near_earth_object_API.json is a copy of real API response from the NASA Near-Earth Object API. 
// Find the following from the API:

// Total Count ---------------------------------------------
// 1. How many near-earth objects did NASA register for the date of the search? Return the asteroid count.

//me
const count = nearEarthObjects.near_earth_objects.reduce((counter, obj) => obj.status === '0' ? counter += 1 : counter, 0); 

count();
console.log(count)


// A solution:

console.log(nearEarthObjects.element_count);



// Averages ------------------------------------------------
// 2. What was the average absolute magnitude of all the near earth objects in this data set? Return the average absolute_magnitude_h.
 
// me
const average = (nearEarthObjects.absolute_magnitude_h.reduce((previousValue, currentValue) => {
    return (previousValue + currentValue)
}, 0) /  nearEarthObjects.element_count) 

console.log(average)


//solution:

// Expected output: 22.613545454545452
const asteroids = Object.values(nearEarthObjects.near_earth_objects).flat();
const average = asteroids.reduce((acc, curr, i, arr) => {
    if (i + 1 == arr.length) {
        // this is the averages trick
        //  at the very last item, take the accumulated sum and divide by the total number of items
        return acc / arr.length;
    }
    return (acc += curr["absolute_magnitude_h"]);
}, 0);

console.log(average);


// Hint - you can achieve this multiple ways, but the reduce method can be a little-known but cool way to find averages. To do it though, you'll need to use the initial_value argument
// For some extra challenge try using reduce with the initial setting argument. To learn more about it, take a look at this page: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce


// Hazardous -----------------------------------------------
// 3. A list of all objects (their id, name, max size in miles, and closest approach in miles) that are labeled potentially hazardous


// me
const asteroids = Object.values(nearEarthObjects.near_earth_objects).flat();
const hazardous  = asteroids.filter( asteroid => 
     {asteroids.is_potentially_hazardous_asteroid == true;}
)

console.log(hazardous)


//solution 1:

const hazardous = nearEarthObjects['near_earth_objects']['2019-12-02'].filter(asteroid => asteroid['is_potentially_hazardous_asteroid'] === true)
console.log(hazardous[0])
const hazardousFmt = hazardous.map(asteroid => {
 const closeApproach = asteroid['close_approach_data']
 return {
    id: asteroid['id'],
    name: asteroid['name'],
    maxSize: asteroid['estimated_diameter']['miles']['estimated_diameter_max'],
    closestApproach: closeApproach[0]['miss_distance']['miles']
 }
})
// expected output: 
// [{"id":"3797749","name":"(2018 BO1)","maxSize":0.2933532873,"closestApproach":"30311929.3487318204"},{"id":"3740494","name":"(2016 AF193)","maxSize":0.1539539936,"closestApproach":"9930345.1795315036"}]

// solution 2:

const {
    id,
    name,
    estimated_diameter: {
        miles: { estimatedDiameterMax },
    },
    closeApproachData,
} = asteroid;
return {
    id: id,
    name: name,
    maxSize: estimatedDiameterMax,
    closestApproach: closeApproachData[0].missDistance.miles,
};
// Too Close for Comfort -----------------------------------
// 4. A list of all objects (their id, name, max size in miles, and closest approach in miles) that have a miss_distance of less than 900,000 miles

const tooClose = nearEarthObjects["near_earth_objects"]["2019-12-02"].filter((asteroid) => {
    const closeApproach = asteroid["close_approach_data"];
    return closeApproach[0].miss_distance.miles < 900000;
});

const tooCloseResults = tooClose.map((asteroid) => {
    const closeApproach = asteroid["close_approach_data"];
    return {
        id: asteroid["id"],
        name: asteroid["name"],
        maxSize: asteroid["estimated_diameter"]["miles"]["estimated_diameter_max"],
        closestApproach: closeApproach[0]["miss_distance"]["miles"],
    };
});

console.log(tooCloseResults);
// Alert ---------------------------------------------------
// 5. Of all the near-earth objects for this date, find the time that the asteroid with the nearest miss will be closest to earth. 

const closest = apiSampleData.nearEarthObjects['2019-12-02'].reduce((closest, curr) => {
    const currDist = parseFloat(curr.closeApproachData[0].missDistance.miles)
    const closestDist = parseFloat(closest.closeApproachData[0].missDstance.miles)
    if (currDist > closestDist) {
     return closest
    } else {
     return curr
    }
    })
    console.log(closest.closeApproachData[0].missDistance.miles)
    // expected output: 775950.9423668918