import styled from 'styled-components';

export const CocktailWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #004ba0;
    width: 750px;
    margin: 20px auto;
    align-self: center;
    flex-wrap: wrap;
    border-radius: 20px;
    padding-right: 10px;
`

export const CocktailInfo = styled.div`
    width: 380px;
    padding: 10px;
    text-align: justify;
    display: relative;
`

export const CocktailHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.1); 
        transition: 0.5s;
    }
`

export const CocktailTitle = styled.h2`
    margin-right: 20px;
    text-align: center;
`

export const CocktailInstructions = styled.p`
    margin-top: 10px;
`

export const CocktailImg = styled.img`
    border-radius: 20px;
    width: 300px;
    height: 300px;
    align-self: center;
`

export const CocktailIsChangedWrapper = styled.div`
    margin: 0 auto;
    font-size: 18px;
    text-align: right;
`

export const FullCocktailCard = styled.div`
 display: flex;
    justify-content: space-between;
    background-color: #004ba0;
    width: 750px;
    margin: 20px auto;
    align-self: center;
    flex-wrap: wrap;
    border-radius: 20px;
    padding-right: 10px;
`

export const CocktailExtraInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
`

export const ExtraCommonInfo = styled.div`
    font-size: 20px;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
`

export const ComponentsWrapper = styled.div`
    display: flex;
`

export const Ingredients = styled.div`
    margin-right: 20px;
`