import { useEffect } from "react"
import MovieLists from "../components/MovieLists"
import { Link } from "react-router-dom";
import { getMovies } from "../action/movies";
import { useDispatch } from "react-redux";
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Homepage() {
    const dispatch = useDispatch()
    const notify = () => toast("Wow so easy!", {
        theme: "dark"
    });

    useEffect(() => {
        dispatch(getMovies())
    
      
    }, [])

    //console.log(getMovies)
    
    
  
    

    return (
        <div className="bg-[#000] w-full min-h-screen">

            <div className="container mx-auto py-[10%] px-[2%]">
                <div className="flex items-center">
                <div className="w-[80%]">
                <h1 className="text-[#fff] text-[30px] font-medium">Fan favorites</h1>
                <p className="text-[#fff] text-[20px] opacity-[0.50]">This week's top TV and movies</p>
                </div>

                <div className="w-[20%] ">
                    
                    <Link to="/forms" className="grid grid-cols-1 gap-[20px] text-center">
                    <span className="text-[#fff] font-medium bg-[#ffffff3b]
                     py-[12px] rounded-[5px] px-[50px] hover:bg-[#fff] hover:text-[#000] ">Add New Movie</span>
                     </Link>
                </div>
                </div>
                
                <div className="Mvlist py-[50px] ">
                {/* <button onClick={notify} class="text-[#fff] font-medium bg-[#ffffff3b]
                     py-[12px] rounded-[5px] px-[50px] hover:bg-[#fff] hover:text-[#000]">Notify!</button> */}
                    
                <div className="grid grid-cols-1">
                    <MovieLists/>
                </div>
            </div>




            </div>

            


        </div>
    )
}

export default Homepage