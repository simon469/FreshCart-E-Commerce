import { Helmet } from "react-helmet"
import errorimg from "../../assets/images/error.svg"

function NotFound() {
  return (
<>
<div>
      <Helmet>
        <title>
          Not Found Page
        </title>
      </Helmet>
    </div>
    <div className="p-4 mt-[60%] md:mt-[40%] lg:mt-[8%]">
      <div className="w-[65%] mx-auto">
        <img className="w-full" src={errorimg} alt="not found" />
      </div>
      </div>
</>
  )
}

export default NotFound