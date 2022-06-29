import {useEffect} from "react"
import { useSelector } from "react-redux";
// import firstImage from "../images/01.jpg"
import { getActors } from "../action/actors";
import { useDispatch } from "react-redux";
import { getProducers } from "../action/producers";
import { getMovies } from "../action/movies";
import { editMovies } from "../action/edit_movie";
import { useNavigate } from 'react-router';



function MovieLists() {


    const Navigate = useNavigate();

    const dispatch = useDispatch()
        
        useEffect(() => {
            dispatch(getActors())
            dispatch(getProducers())
            dispatch(getMovies())
        }, [])


    const movies = useSelector((state)=>  state.movies.movies)

    console.log(movies);

    


    return (
        
        <div className="list text-[#fff] grid grid-cols-6 gap-[20px]">
            { movies?.map((itam,i)=>

            <div onClick={()=>{
                dispatch(editMovies(itam))
                Navigate('/forms');
            }}  
            
            className="bg-[#ffffff1f] rounded-[5px]">
                <span href="#">
                    <img src={'http://localhost:3001/uploads/'+itam.poster} />
                </span>
                <div className="px-[8px]">

                <div className="flex items-center py-[10px] px-[10px] ">
               
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                        className="ipc-icon ipc-icon--star-inline mr-[8px] fill-[#FF9800]" id="iconContext-star-inline"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="presentation">
                        <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147
                     4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>

                    <span className="text-[15px] font-medium">7.5</span>
                </div>
                <h1 className="text-[17px] font-medium" >{itam.name}</h1>
                
                
                <div className='grid grid-rows-1 pt-[20px] px-[3px] '>
                    <span className="w-full  py-[8px] text-center bg-[#ffffff24] rounded-[5px]">
                       <span className="text-[#5799ef] font-medium">Watchlist+</span> 
                    </span>
                    <span className="w-full flex justify-center items-center py-[12px] text-center  rounded-[5px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="ipc-icon fill-[#f5f5f5]  mr-[2px] ipc-icon--play-arrow ipc-button__icon ipc-button__icon--pre" id="iconContext-play-arrow" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg>
                       <span className="text-[#fff] font-medium">Trailer</span> 
                    </span>
                </div>
                
                </div>
            </div>
           )}
 
        </div>
         
    )

}

export default MovieLists;