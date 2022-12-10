import React from "react";
import CocktailCard from "../components/CocktailCard";
import InfoCard from "../components/InfoCard"
import { ViewTitle } from "../Styled/Views";


export default function Home(props) { 
    React.useEffect(() => {
        async function fetcData() {   
            props.setLoading(true);

            const allCocktails = [];
            const finalCocktails = [];
           
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
            const data = await response.json(); 

            data.drinks.map(drink => allCocktails.push(drink))

            for(let i = props.count*20; i<props.count*20+20;i++){
                if(allCocktails[i] !== undefined) {

                    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${allCocktails[i].idDrink}`)
                    const data = await response.json();

                    data.drinks[0].isFavourite = false;
                    data.drinks[0].isChanged = false;
                    data.drinks[0].key = data.drinks[0].idDrink;
                    finalCocktails.push(data.drinks[0]);
                }  
                
                else {
                    props.setLoading(false)
                    return;
                }            
            }

            props.setCocktails(prevState => {
                if(prevState[0] === undefined){
                    return [...finalCocktails]
                }
                else {
                    if(prevState[0].idDrink === finalCocktails[0].idDrink){
                        return [...finalCocktails]
                    }
                    return [...prevState, ...finalCocktails]
                }         
            })    
            props.setLoading(false)

            
        };
        if(JSON.parse(sessionStorage.getItem('cocktails')) === null || 
            JSON.parse(sessionStorage.getItem('cocktails')).length === 0 ||
            JSON.parse(sessionStorage.getItem('cocktails')).length < (props.count+1)*20) 
        {
            fetcData();
        }
        else {
            props.setCocktails(JSON.parse(sessionStorage.getItem('cocktails')))
            props.setLoading(false)
        }
       
    },[props.count])

    React.useEffect(() => {
        sessionStorage.setItem("cocktails", JSON.stringify(props.cocktails))
    }, [props.cocktails])



    function toggleFavourite(id){
        props.setCocktails(oldCocktails => oldCocktails.map(cocktail => {
            return cocktail.idDrink === id ? 
                {...cocktail, isFavourite: !cocktail.isFavourite} :
                cocktail
        }))
    }

    function toggleInfo(id){
        props.setCocktails(oldCocktails => oldCocktails.map(cocktail => {
            return cocktail.idDrink === id ? 
                {...cocktail, info: !cocktail.info} :
                cocktail
        }))
    }

    const cocktailElements = props.cocktails.map((cocktail,index) => {
        if(cocktail.info) {
            return (
                <InfoCard 
                    key = {index}
                    id={cocktail.idDrink}
                    title= {cocktail.strDrink}
                    img= {cocktail.strDrinkThumb}
                    instructions= {cocktail.strInstructions}
                    handleFavourite = {() => toggleFavourite(cocktail.idDrink)}
                    handleInfo = {() => toggleInfo(cocktail.idDrink)}
                    isFavourite = {cocktail.isFavourite}
                    allInfo = {cocktail} 
                />
            )
        }
        else {
            return (
                <CocktailCard 
                    key = {index}
                    id={cocktail.idDrink}
                    title= {cocktail.strDrink}
                    img= {cocktail.strDrinkThumb}
                    instructions= {cocktail.strInstructions}
                    handleFavourite = {() => toggleFavourite(cocktail.idDrink)}
                    handleInfo = {() => toggleInfo(cocktail.idDrink)}
                    isFavourite = {cocktail.isFavourite}
                />
            )
        }
       
    })


    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [props.cocktails])

    const handleScroll = (e) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.removeEventListener("scroll", handleScroll)
            props.setCount(prev => prev + 1)
        }
    }


    return (
        <div>  
            <ViewTitle>Home</ViewTitle>
            {!props.loading && cocktailElements}
            {props.loading && <p>Loading...</p>}
        </div>
        
    )

}