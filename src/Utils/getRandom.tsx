// program to get a random item from an array

const getRandomItem= (arr:string[]) => {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}


export default getRandomItem