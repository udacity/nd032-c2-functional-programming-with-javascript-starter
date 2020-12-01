// Directions: Rewrite the imperative code below as Object-Oriented 
// let status = 'active'
// let warp = 2
// let type = 'Dilithium Crystal'
// let status_report = 'Captain, '

// if(status === 'active' && warp <= 4) {
//     status_report += 'the engines are active and we could be going faster.'
// } else if (status === 'active' && warp > 4) {
//     status_report += 'the engines are active and we are going ' + warp + '.'
// } else if (status === 'down') {
//     status_report += 'the engines are down.'
// } else {
//     status_report += 'the comms are down and we can`t reach engineering.'
// }

// console.log(status_report)

// My Solution
class Person {
    constructor(name, warp, status){
        this.name = name;
        this.warp = warp;
        this.status = status;
    }

    statusReport() {
        let status_report = '';
        if(this.status === 'active' && this.warp <= 4) {
            status_report = `the engines are active and we could be going faster.`
        } else if (this.status === 'active' && this.warp > 4) {
            status_report = `the engines are active and we are going ${this.warp}.`
        } else if (this.status === 'down') {
            status_report = `the engines are down.`
        } else {
            status_report = `the comms are down and we can't reach engineering.`
        }
        return status_report;
    }
}

const captain = new Person('Kirk', 5 , 'active');
let status = captain.statusReport();
console.log(status);

// Udacity Solution
class WarpDrive {
    // Creating a class requires us to decide what properties to give it.
    // Take a look at the imperative program - everything that was a global variable there, we want to make a property on our class
    constructor(type, recipient) {
        this.type = type
        this.status = 'active'
        this.warp = 2
        this.recipient = recipient ? recipient : 'Captain'
    }

    // The bulk of the logic that the imperative program had in the global scope, we turn into methods
    // The logic will stay mostly the same but we now need to reference values that belong to this instance of class WarpDrive, instead of global variables

    status_report() {
        if (this.status === 'active' && this.warp <= 4) {
            return this.recipient + ', the engines are active and we could be going faster'
        } else if (this.status === 'active' && this.warp > 4) {
            return this.recipient + ', the engines are active and we are going ' + this.warp
        } else if (this.status === 'down') {
            return this.recipient + ', the engines are down'
        } else {
            return this.recipient + ', the comms are down and we can`t reach engineering'
        }
    }

    // Anytime you see a variable changing in the imperative program, it is a sign that a method will be needed in this class
    // I added these setter methods as examples for how you could update the state of the object to test the various status_report responses

    set_status(status) {
        this.status = status
    }

    set_warp(integer) {
        this.warp = integer
    }
}

// Because we are working with classes now, we have to instantiate the class before we use it

let enterprise_warp = new WarpDrive('Dilithium Chrystal')

// NOTE: This is a big win for the object oriented style - it is so easy to make multiple instances of WarpDrive
// Our program could simultaneously reference as many warp drive as instances as we want -- how would you do that in the imperative program?

enterprise_warp.set_warp(2)

console.log(enterprise_warp.status_report())

// expected output: Captain, the engines are active and we could go faster.