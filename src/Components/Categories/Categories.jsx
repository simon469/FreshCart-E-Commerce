import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";

function Categories() {

  async function getCategories(){
    try {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    } catch (error) {
      console.log(error);
    }
  }

  const {data, isLoading } = useQuery("getCategories", getCategories);

  if(isLoading){
    return  <div className="h-screen flex flex-wrap justify-center items-center bg-green-700">
    <FallingLines
    color="#fff"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"/>
      </div>
  }


  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <section className='py-8'>
        <div className="w-full md:w-[90%] m-auto mt-80 md:mt-90 lg:mt-28">
          <div className="flex flex-wrap justify-center items-center">
            {data?.data.data.map((catg ) => <>
            <div key={catg._id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4">

                <div className="inner p-2 w-[105%] bg-slate-200">
                <img src={catg.image} alt="category name" className="rounded-t-lg w-full h-[200px] "/>
                <h2 className="text-green-600 font-mono font-semibold text-center mt-3">{catg.name}</h2>

                </div>
            </div>
            
            
            
            
            </>)}

          </div>

        </div>
      </section>


    </>
  )
}

          {/* <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((catg ) => <>
              <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4" key={catg._id}>
                <div className="inner p-3 bg-slate-200 hover:shadow-md hover:shadow-green-700 cursor-pointer rounded">
                  <img
                    src={catg.image}
                    alt={catg.name}
                    className="w-full"
                  />
                  <div className="text-center">
                  <h2 className="h5 font-bold text-green-600 text-center p-3">{catg.name}</h2>
                  </div>
                </div>
              </div>
  
          </>)}
          </div> */}

export default Categories