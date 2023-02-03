import { useEffect } from "react";

import { ViewTitle, ViewWrappper } from "../Styled/Views";
import { fetchAllCocktails, getTodayTimestamp } from "../Helpers";

export default function Home({setCocktails}){
    const todayTime = getTodayTimestamp()

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
    return (
        <ViewWrappper>
            <ViewTitle>Welcome to Cocktails catalogue</ViewTitle>
        </ViewWrappper>
    )
}