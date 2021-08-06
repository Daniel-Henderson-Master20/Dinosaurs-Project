//Dino Constructor
function Dino(species, dinoWeight, dinoHeight, dinoDiet, where, when, fact) {
    this.species = species
    this.dinoWeight = dinoWeight
    this.dinoHeight = dinoHeight
    this.dinoDiet = dinoDiet
    this.where = where
    this.when = when
    this.fact = fact
        // compare weight
    this.compareWeight = function(humanWeight) {
            weightDifference = dinoWeight - humanWeight
            return `There's a ${Math.abs(weightDifference)} pound difference between you and this dinosaur`
        }
        // compare height
    this.compareHeight = function(humanHeightFeet, humanHeightInches) {
            totalHeight = Number(humanHeightFeet * 12) + Number(humanHeightInches)
            heightDifference = dinoHeight - totalHeight
            return `There's a ${heightDifference} inch difference between you and this dinosaur`
        }
        // compare diet
    this.compareDiet = function(humanDiet) {
        if (dinoDiet == humanDiet.toLowerCase()) { //convert capitals to all lower case
            let result = 'You both eat the same types of food'
            return result
        } else {
            let result = ` This Dino is a ${dinoDiet}`
            return result
        }
    }

}
//Human Object
function Human(species, humanHeightFeet, humanHeightInches, humanWeight, humanDiet, fact) {
    this.species = species
    this.humanHeightFeet = humanHeightFeet
    this.humanHeightInches = humanHeightInches
    this.humanWeight = humanWeight
    this.humanDiet = humanDiet
    this.fact = fact
}
// Fetch Dinosaur data 
window.fetch('http://127.0.0.1:65292/json/dino.json')
    .then(response => response.json()) //get response from url
    .then(data => { //get data
        getDinoArray(data.Dinos) //pass array of Dino objects into the getDinoArray function (line 34)
    })
    .catch(error => console.log(`There was a data fetch error: ${error}`));

// Creating Dino Array 
function getDinoArray(dinos) {
    dinoArray = []
    dinos.forEach((dino) => {
        newDinoObj = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact)
        dinoArray.push(newDinoObj)

    });
    return dinoArray
}
// Use IIFE to get human data 
function getHumanData() {
    return (function() {
        humanName = document.querySelector('#name').value;
        species = "Human"
        humanHeightFeet = document.querySelector('#feet').value;
        humanHeightInches = document.querySelector('#inches').value;
        humanWeight = document.querySelector('#weight').value;
        humanDiet = document.querySelector('#diet').value;
        fact = ""
            //create a new human object
        const human = new Human(species, humanHeightFeet, humanHeightInches, humanWeight, humanDiet, fact)
        return human
    })();
}
// remove form 
function removeForm() {
    document.querySelector("#dino-compare").style.display = 'none'
}
// generate tiles 
function generateTiles(animalObj, human) {
    animalObj.splice(4, 0, human)
    for (let index = 0; index < 9; index++) {
        animal = animalObj[index]
        let tileDiv = document.createElement('div')
        tileDiv.className = 'grid-item'
            // creating tag for the tile
        if (index === 4) {
            animal.species = document.querySelector('#name').value
            humanWeight = document.querySelector('#weight').value
            humanHeightFeet = document.querySelector('#feet').value
            humanHeightInches = document.querySelector('#inches').value
            humanDiet = document.querySelector('#diet').value
            let tile = document.createElement("h2")
            tile.innerHTML = `<h2>${animal.species}</h2>
            <img src="/Users/danielhenderson/Desktop/Dinosaurs-Project/images/human.png" alt = "picture of ${animal.species}"/>`
            tileDiv.appendChild(tile)
        } else if (index === 8) { // pigeon
            let tile = document.createElement("h2")
            tile.innerHTML = `<h2>${animal.species}</h2>
            <img src="/Users/danielhenderson/Desktop/Dinosaurs-Project/images/${animal.species.toLowerCase()}.png" alt = "picture of ${animal.species}"/>
            <h4>${animal.fact}</h4>`
            tileDiv.appendChild(tile)
        } else {
            //random facts everytime tiles render
            const factNumber = Math.floor(Math.random() * 4) // select a random number 
            let genericFact = animal.fact
            let aCW = animal.compareWeight(humanWeight)
            let aCH = animal.compareHeight(humanHeightFeet, humanHeightInches)
            let aCD = animal.compareDiet(humanDiet)
            facts = [genericFact, aCW, aCH, aCD]
            let tile = document.createElement("h2")
            tile.innerHTML = `<h2>${animal.species}</h2>
            <img src="/Users/danielhenderson/Desktop/Dinosaurs-Project/images/${animal.species.toLowerCase()}.png" alt = "picture of ${animal.species}"/>
            <h4>${facts[factNumber]}</h4>`
            tileDiv.appendChild(tile)
        }
        // creates the element on the page
        document.querySelector("#grid").appendChild(tileDiv)
    }
}
// On button click, prepare and display infographic
let button = document.querySelector("#btn")
button.addEventListener("click", function() {
    getHumanData()
    removeForm()
    generateTiles(dinoArray, getHumanData())
})