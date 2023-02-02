import { useEffect } from "react";

import { ViewTitle, ViewWrappper } from "../Styled/Views";
import { fetchAllCocktails } from "../Helpers";
import { dformat } from "../Helpers";

export default function Home({setCocktails}){
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCocktails();
            setCocktails(data);
            data.drinks.map(drink => {
                drink.isFavourite = false
                drink.lastUpdate = dformat
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
    }, [setCocktails])

    return (
        <ViewWrappper>
            <ViewTitle>Welcome to Cocktails catalogue</ViewTitle>
        </ViewWrappper>
    )
}