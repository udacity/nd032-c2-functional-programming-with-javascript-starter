weaponsWithNoises = [
    { name: "Phaser", noise: "bssszzsssss", universe: "Star Trek" },
    { name: "Blaster", noise: "Pew Pew", universe: "Star Wars" },
    { name: "Sonic Screwdriver", noise: "Pew Pew", universe: "Dr. Who" },
    { name: "Lightsaber", noise: "Pew Pew", universe: "Star Wars" },
    { name: "Noisy Cricket", noise: "Pew Pew", universe: "Men in Black" },
];

function weaponsFromUniverse(universe) {
    // ...Your code here!
}

// solution:
function weaponsFromUniverse(universe) {
    const useableWeapons = weaponsWithNoises.filter((w) => w.universe == universe);

    const useWeapon = (weaponName) => {
        const weapon = useableWeapons.find((w) => weaponName == w.name);

        if (weapon) {
            console.log(`used ${weapon.name}: ${weapon.noise}`);
        } else {
            console.log(`${weaponName} is not a part of the ${universe} universe`);
        }
    };

    return useWeapon;
}

const useStarWarsWeapon = weaponsFromUniverse("Star Wars");
useStarWarsWeapon("Blaster");
useStarWarsWeapon("Noisy Cricket");
