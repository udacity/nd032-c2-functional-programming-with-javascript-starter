// ----------------------------------------------------------
// FLAT EXERCISE
// ----------------------------------------------------------
// This short list of some marvel characters is abitrarily nested. Experiment with the effect of flattening to various depths.

const characters = [
    ['Starlord', 'Gamora', 'Groot'],
    ['Dr. Strange', ['Captain America', 'Bucky Barnes'], ['Thor', 'Hulk', ['Loki']], 'Thanos'],
    ['Iron Man', 'Ultron'],
    ['Spider Man', ['Venom']],
    ['Professor X', 'Wolverine', 'Quicksilver', ['Magneto']]
]

const results = characters.flat(1)
// const results = characters.flat(2)
// const results = characters.flat(3)
// And what happens if you go past the max depth of the array?
// const results = characters.flat(5)

// ----------------------------------------------------------
// FIND EXERCISE
// ----------------------------------------------------------
// Best use cases for FIND are when you want to cast a wider net, because you get to create your own criteria that can be either very specific or more generic.

// Determine whether any of the following have a value that contains the characters 'ABC'

const ids = [
    'ADHKE',
    'ANFKM',
    'QIMVU',
    'PQMFU',
    'ABCKO',
    'IUABC'
]


// ----------------------------------------------------------
// INCLUDE EXERCISES
// ----------------------------------------------------------
// 1. It best to use INCLUDES when what the value is does not matter, simply its presence. Imagine the scenario that you are need to check a user's id against a list of admin id's.

const currentUserId = '29nv283bfc0szn16723'

const admins = [
    '02398cn7syap0dmbnv0',
    '2389sakvjhw8e7f09fv',
    '09mxvb82kzjd6v1sfdg',
    '9a76zxmsdnv1u622345',
    '29nv283bfc0szn16723',
    '029834zmnv9jhgfu2ab',
    '12mnz09v87bas78fb12',
    '098Xc8x76m3nb4aposi'
]

// ----------------------------------------------------------

// 2. Checking between lists. Another thing that you might need to do in real life is check items between two arrays. Check if array B has any values that are also in array A. This becomes especially helpful when the values are hard to distinguish visually

const A = [
    '02398cn7syap0dmbnv0',
    '2389sakvjhw8e7f09fv',
    '09mxvb82kzjd6v1sfdg',
    '9a76zxmsdnv1u622345',
    '29nv283bfc0szn16723',
    '029834zmnv9jhgfu2ab',
    '12mnz09v87bas78fb12',
    '098Xc8x76m3nb4aposi'
]

const B = [
    '13xnse8aanv87Hdnfv8',
    '2389sakvjhw8e7f09fv',
    '12mn0vnZkadfh237LPd',
    '1209MNBd8723nvkwejs',
    '298374naskdj273ubsl',
    '098LKJnsvijevkwejf6'
]