//Dino Constructor
function Dino(dinoHeight, dinoDiet, species, dinoWeight, fact, where, when) {
    this.dinoHeight = dinoHeight
    this.dinoDiet = dinoDiet
    this.species = species
    this.dinoWeight = dinoWeight
    this.fact = fact
    this.where = where
    this.when = when
}
//Human Object
function Human(humanWeight, humanDiet, species, humanHeightFeet, humanHeightInches) {
    this.humanWeight = humanWeight
    this.humanDiet = humanDiet
    this.species = species
    this.humanHeightFeet = humanHeightFeet
    this.humanHeightInches = humanHeightInches
}

// Use IIFE to get human data from form
function getHumanData() {
    return (function() {
        humanName = document.querySelector('#name').value;
        species = "Human"
        humanHeightFeet = document.querySelector('#feet').value;
        humanHeightInches = document.querySelector('#inches').value;
        humanWeight = document.querySelector('#weight').value;
        humanDiet = document.querySelector('#diet').value;
        Fact = " " // human object does not use fact
            //human object from the data
        const human = new Human(species, humanHeightFeet, humanHeightInches, humanWeight, humanDiet, fact)
        return human
    })();
}
// Get Dinosaur data from JSON
let url = 'dino.json'
fetch(url)
    .then(response => response.json()) //get response from link
    .then(data => { //get data
        getDinoArray(data.Dinos) //pass array of Dino objects (line 45)
    })
    .catch(error => console.log(`data fetch error: ${error}`));
// Dino Array from Json
function getDinoArray(dinos, human) {
    dinoArray = []
    dinos.forEach((dino) => {
        newDinoObj = new Dino(dino.species, dino.height, dino.weight, dino.diet, dino.when, dino.where, dino.fact)
        dinoArray.push(newDinoObj)
    });
    return dinoArray
}
// Create Dino Compare Method 1 HEIGHT ?
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compareHeight() {
    totalHumanHeight = Number((Feet * 12)) + Number(Inches)
    let Feet = getHumanData().humanHeightFeet
    let Inches = getHumanData().humanHeightInches

    console.log(totalHumanHeight)
}
// Create Dino Compare Method 2 WEIGHT ?
// NOTE: Weight in JSON file is in lbs, height in inches.[]
function compareWeightA(humanWeight, dinoWeight) {
    weightDifference = dinoWeight - humanWeight
    console.log(`You are ${weightDifference} pounds less than this dinosaure`)
}
// Create Dino Compare Method 3 DIET?
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareName(humanDiet, dinoDiet) {
    return
}
// remove form from screen
function removeForm() {
    document.querySelector("#dino-compare").style.display = 'none'

}
// Generate Tiles for each Dino in Array
function generateTiles(human, animalObj) {
    animalObj.splice(4, 0, human)
    animalObj.forEach(function(dino) {
        let tileDiv = document.createElement('div')
        tileDiv.className = 'grid-item'
            // creating a h2 tag for the tile
        let tile = document.createElement("h2")
        tile.innerHTML = `<h2>${dino.species}</h2>
        <img src="JPG/images/${dino.species.toLowerCase()}.png" alt = "picture of ${dino.species}"/>
        <h4>${dino.fact}</h4>`
        tileDiv.appendChild(tile)

        // creates the element on the page
        document.querySelector("#grid").appendChild(tileDiv)
    })
}
// On button click, prepare and display infographic
let button = document.querySelector("#btn")

button.addEventListener("click", function() {
    getHumanData()
    removeForm()
    generateTiles(dinoArray, getHumanData())
    compareHeight()
})