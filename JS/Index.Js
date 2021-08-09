//Dino Constructor function with properties to match the json data
function Dino(species, dinoDiet, dinoHeight, dinoWeight, when, where, fact) {
    this.species = species
    this.dinoDiet = dinoDiet
    this.dinoHeight = dinoHeight
    this.dinoWeight = dinoWeight
    this.when = when
    this.where = where
    this.fact = fact
        // compare the difference in height of dino and human. Human height is converted to inches to match json info. return a comment about the difference in height.
    this.compareHeight = function(humanHeightFeet, humanHeightInches) {
            totalHeight = Number(humanHeightFeet * 12) + Number(humanHeightInches)
            heightDiff = dinoHeight - totalHeight
            return `There's a ${heightDiff} inch difference between you and this dinosaur!`
        }
        // compare weight of dino and human then return a comment about that weight
    this.compareWeight = function(humanWeight) {
            weightDiff = dinoWeight - humanWeight
            return `There's a ${Math.abs(weightDiff)} pound difference between you and this dinosaur!`
        }
        // compare diet of dino and human. then return one of two different comments.
    this.compareDiet = function(humanDiet) {
        if (dinoDiet == humanDiet.toLowerCase()) { //convert capitals to all lower case
            let result = 'You both eat the same types of food!'
            return result
        } else {
            let result = ` This Dino is a ${dinoDiet}!`
            return result
        }
    }

}
// Creating Dino Array function to be called during button click
function getDinoArray(dinos) {
    dinoArray = []
    dinos.forEach((dino) => {
        newDinoObject = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact)
        dinoArray.push(newDinoObject)
    });
    return dinoArray
}
//Human Object function with properties to match the form data
function Human(species, humanDiet, humanWeight, humanHeightFeet, humanHeightInches, fact) {
    this.species = species
    this.humanDiet = humanDiet
    this.humanWeight = humanWeight
    this.humanHeightFeet = humanHeightFeet
    this.humanHeightInches = humanHeightInches
    this.fact = fact
}
// Fetch Dinosaur data from json file
window.fetch('json/dino.json')
    .then(response => response.json())
    .then(data => { //get data
        getDinoArray(data.Dinos) //pass array into function
    })
    .catch(error => console.log(`There was a data fetch error: ${error}`));
// Use IIFE to get human data 
function getHumanData() {
    return (function() {
        humanName = document.querySelector('#name').value;
        species = "Human"
        humanDiet = document.querySelector('#diet').value;
        humanWeight = document.querySelector('#weight').value;
        humanHeightFeet = document.querySelector('#feet').value;
        humanHeightInches = document.querySelector('#inches').value;
        fact = ""
            //new human object
        const human = new Human(species, humanWeight, humanDiet, humanHeightFeet, humanHeightInches, fact)
        return human
    })();
}
// generate dino tiles function and human tile function. Using splice to put human in center tile. and else if for pigeon tile. Else statement to generate random fact 
function generateTiles(animalObject, human) {
    animalObject.splice(4, 0, human)
    for (let i = 0; i < 9; i++) {
        creature = animalObject[i]
        let tDiv = document.createElement('div')
        tDiv.className = 'grid-item'
            // creating tag for the tile 
        if (i === 4) {
            creature.species = document.querySelector('#name').value
            humanDiet = document.querySelector('#diet').value
            humanHeightFeet = document.querySelector('#feet').value
            humanHeightInches = document.querySelector('#inches').value
            humanWeight = document.querySelector('#weight').value
            let tile = document.createElement("h2")
            tile.innerHTML = `<h3>${creature.species}</h3>
                    <img src="images/human.png" alt = "picture of ${creature.species}"/>`
            tDiv.appendChild(tile)
        } else if (i === 8) { // pigeon
            let tile = document.createElement("h2")
            tile.innerHTML = `<h3>${creature.species}</h3>
                <img src="/images${creature.species.toLowerCase()}.png" alt = "picture of ${creature.species}"/>
                <h3>${creature.fact}</h3>`
            tDiv.appendChild(tile)
        } else {
            //generates a random fact everytime tiles render
            const factNumber = Math.floor(Math.random() * 4) // select a random number 
            let cCD = creature.compareDiet(humanDiet)
            let cCW = creature.compareWeight(humanWeight)
            let cCH = creature.compareHeight(humanHeightFeet, humanHeightInches)
            let genericFact = creature.fact
            facts = [genericFact, cCD, cCW, cCH]
            let tile = document.createElement("h2")
            tile.innerHTML = `<h3>${creature.species}</h3>
                    <img src="/images${creature.species.toLowerCase()}.png" alt = "picture of ${creature.species}"/>
                    <h3>${facts[factNumber]}</h3>`
            tDiv.appendChild(tile)
        }
        // create the element on the page
        document.querySelector("#grid").appendChild(tDiv)
    }
}
// remove form from screen after click event
function removeForm() {
    document.querySelector("#dino-compare").style.display = 'none'
}
// On button click, prepare and display infographic
let button = document.querySelector("#btn")
button.addEventListener("click", function() {
    getHumanData()
    removeForm()
    generateTiles(dinoArray, getHumanData())
})