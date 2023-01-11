import { Outlet } from "react-router-dom"
import { ViewTitle } from "../Styled/Views"

export default function CareersLayout() {
  return (
    <div>
      {<ViewTitle>Cocktails</ViewTitle> }
      <Outlet />
    </div>
  )
}
