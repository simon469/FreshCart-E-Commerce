import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FallingLines} from 'react-loader-spinner';
import { useQuery } from 'react-query';

function Brands() {
  async function getBrands(){
    window.scrollTo({top:0,left:0, behavior:"smooth"});
    try {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page`)
      
    } catch (error) {
      console.log(error)
    }

  }

  const {data, isLoading } = useQuery("Brands", getBrands);

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
        <title>Brands</title>
        <meta name="description" content="Brands Page" />
      </Helmet>
        <main className='my-auto mt-80 md:mt-62 lg:mt-28'>
          
            <div className="flex flex-wrap justify-center items-center">
            {data?.data.data.map((brand ) => <>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4" key={brand._id}>
                  <div className="hover:shadow-md hover:shadow-green-700 cursor-pointer catgCard overflow-hidden rounded">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full mb-2"
                    />
                    <h2 className="h5 font-bold text-green-600 text-center p-3">{brand.name}</h2>
                  </div>
                </div>
    
            </>)}
            </div>
        </main>
      
    </>
  )
}

export default Brands