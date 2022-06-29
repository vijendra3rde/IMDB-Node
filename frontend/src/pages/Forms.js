import {useEffect} from "react"
import FullForm from "../components/FullForm"
import { Link } from "react-router-dom";
import { getActors } from "../action/actors";
import { useDispatch } from "react-redux";
import { getProducers } from "../action/producers";
import { getMovies } from "../action/movies";
import { editMovies } from "../action/edit_movie";



function Forms() {

        const dispatch = useDispatch()
        
        useEffect(() => {
            dispatch(getActors())
            dispatch(getProducers())
            dispatch(getMovies())
        }, [])

        // console.log(getActors);



    return (
        <div className="bg-[#000] w-full min-h-screen">

            <div className="container w-[80%]  mx-auto py-[10%] px-[5%]">

            <div className="flex items-center">
                <div className="w-[80%]">
                <h1 className="text-[#fff] text-[30px] font-medium">Add Movies</h1>
                <p className="text-[#fff] text-[20px] opacity-[0.50]">This week's top TV and movies</p>
                </div>

                <div className="w-[20%]">
                    
                    <Link to="/" className="grid grid-cols-1 gap-[20px] text-center ">
                    <span 
                     onClick={()=>{
                        dispatch(editMovies({}))
                    }}  
                    className="text-[#000] font-medium bg-[#fff]
                           py-[12px] rounded-[5px] px-[50px] hover:opacity-[0.85]">Back</span>
                     </Link>
                </div>
                </div>



                    <FullForm/>

            </div>

        </div>
    )
}

export default Forms;