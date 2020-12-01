weapons = [
    {name: 'Phaser', noise: 'bssszzsssss', universe: 'Star Trek'},
	{name: 'Blaster', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Sonic Screwdriver', noise: 'Pew Pew', universe: 'Dr. Who'},
	{name: 'Lightsaber', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Noisy Cricket', noise: 'Pew Pew', universe: 'Men in Black'}
]

function weaponsFromUniverse(universe) {
    const useable_weapons = weapons.filter(w => w.universe == universe)

    const useWeapon = (weaponName) => {
        const weapon = useable_weapons.find(w => weaponName == w.name)

        if (weapon) {
            console.log(`used ${weapon.name}: ${weapon.noise}`)
        } else {
            console.log(`${weaponName} is not a part of the ${universe} universe`)
        }
    }

    return useWeapon
}

const useStarWarsWeapon = weaponsFromUniverse('Star Wars')
useStarWarsWeapon('Blaster')
useStarWarsWeapon('Noisy Cricket')


// function weaponsFromUniverse(universe) {
// 	const useableWeapons = weapons.filter(noise => noise.universe == universe);
	
// 	const useWeapons = (weaponName) => {
// 		const weapon = useableWeapons.filter(w => weaponName == w.name)

// 		if (weapon) {
//             console.log(`used ${weapon.name}: ${weapon.noise}`)
//         } else {
//             console.log(`${weaponName} is not a part of the ${universe} universe`)
//         }
// 	}
// 	return useWeapons
// }

// const test = weaponsFromUniverse('Star Wars');
// test('Blaster');
// USAGE
//const useStarWarsWeapon = weaponsFromUniverse('Star Wars')

//useStarWarsWeapon('Blaster') // console logs 'used Blaster: Pew Pew'
//useStarWarsWeapon('Noisy Cricket') // console logs 'Noisy Cricket is not a part of the Star Wars universe'