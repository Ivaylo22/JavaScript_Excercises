import React, { useEffect, useState} from "react";

import CocktailCard from "../components/CocktailCard";
import { CocktailWrapper } from "../Styled/Cocktail";
import {  StyledShowMore, StyledLink } from "../Styled/Navbar";

import { getTodayTimestamp, toggleFavourite, fetchAllCocktails } from "../Helpers";

import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({cocktails, setCocktails}) {    
    const todayTime = getTodayTimestamp()

    const [count, setCount] = useState(20);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCocktails();
            setCocktails(data);
            data.drinks.map(drink => {
                drink.isFavourite = false
                drink.lastUpdate = todayTime
                return drink
            })
            localStorage.setItem("cocktails", JSON.stringify(data))
          };

          if(!JSON.parse(localStorage.getItem("cocktails"))){
                fetchData();
          }
          else {
                setCocktails(JSON.parse(localStorage.getItem("cocktails")))
          }   
    }, [setCocktails, todayTime])

    function fetchMore() {
        setTimeout(() => {
            setCount(prevCount => prevCount + 20)
          }, 1500);

        if(count > cocktails.drinks.length){
            setHasMore(false)
        }
    }
    

    if(!cocktails.drinks){
        return null;
    }
    return (
        <div>
            <InfiniteScroll
                dataLength = {count}
                next = {fetchMore}
                scrollThreshold = {1}
                hasMore={hasMore}
                loader = {<h4>Loading...</h4>}
            >
                {cocktails.drinks.slice(0, count).map(drink => (
                <CocktailWrapper key={drink.idDrink}>
                    <CocktailCard
                        img={drink.strDrinkThumb}
                        title={drink.strDrink}
                        id={drink.idDrink}
                        isFavourite={drink.isFavourite}
                        handleFavourite={() => toggleFavourite(drink.idDrink, cocktails, setCocktails)}
                    />
                    <StyledShowMore variant="contained"><StyledLink to={drink.idDrink.toString()}>Show More</StyledLink></StyledShowMore>

                </CocktailWrapper>

            ))}
                

            </InfiniteScroll>
        </div>
    )
}