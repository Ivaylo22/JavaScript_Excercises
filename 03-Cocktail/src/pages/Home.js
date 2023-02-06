import { useCallback, useEffect } from "react";

import { ViewTitle, ViewWrappper } from "../Styled/Views";
import { fetchAllCocktails,  setDefaultFavAndUpdate } from "../Helpers";

export default function Home({setCocktails}){
    const memorizedSetDefault = useCallback((drink) => {
        setDefaultFavAndUpdate(drink)
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetchAllCocktails();           
            data.drinks.map(drink => {
                return memorizedSetDefault(drink)
            })

            setCocktails(data);
            localStorage.setItem("cocktails", JSON.stringify(data))
          };

          if(!JSON.parse(localStorage.getItem("cocktails"))){
                fetchData();
          }
          else {
                setCocktails(JSON.parse(localStorage.getItem("cocktails")))
          }   
    }, [setCocktails, memorizedSetDefault])
    return (
        <ViewWrappper>
            <ViewTitle>Welcome to Cocktails catalogue</ViewTitle>
        </ViewWrappper>
    )
}