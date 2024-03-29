export function toggleFavourite(id, cocktails, setCocktails){
    let changedCocktails = {
        drinks: []
    };

    cocktails.drinks.map(cocktail => {
        if(cocktail.idDrink === id) {
            cocktail.isFavourite = !cocktail.isFavourite;
        }
        changedCocktails.drinks.push(cocktail);
        return changedCocktails;
    })
    setCocktails(changedCocktails)
    localStorage.setItem("cocktails", JSON.stringify(changedCocktails))
}

export async function fetchAllCocktails() {
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`);
    const data = await result.json();

    return data;
}

export async function fetchCocktailById(id) {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)

    return res
}

export async function fetchRandomCocktail() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json()

    return data
}

export function getItemsFromLocalStorage (param) {
    return JSON.parse(localStorage.getItem(param))
}

export function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
}

export function getTodayTimestamp() {
    let d = new Date()
    return d.getTime();
}

export function setDefaultFavAndUpdate(drink) {
    console.log("asd")
    const todayTime = getTodayTimestamp()

    drink.isFavourite = false
    drink.lastUpdate = todayTime

    return drink;
}