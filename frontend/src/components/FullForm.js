import { useState } from "react";
import ActorPopup from "./ActorPopup";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import ProdusersPopup from "./ProdusersPopup";
import { postMoviesAPI, putMoviesAPI } from "../APIS/API";
import { useSelector } from "react-redux";
import { editMovies } from "../action/edit_movie";
import { useDispatch } from "react-redux";

import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function MovieLists() {

  const producers = useSelector((state)=>  state.producers.producers)

  const actors = useSelector((state)=>  state.actors.actors)

  const movies = useSelector((state)=>  state.movies.movies)

  const editmovies = useSelector((state)=>  state.editmovies.editmovies)

  const dispatch = useDispatch()

  const editDOne = () => toast("Wow so easy!", {
    theme: "dark"
});



const AddNew = () => toast("Wow so easy!", {
  theme: "dark"
});


  console.log(editmovies);

  const [images, setImage] = useState()

  const formik = useFormik({
    initialValues: {
      name: editmovies?.name?editmovies?.name:"",
      year_of_release: editmovies?.year_of_release?editmovies?.year_of_release:"",
      plot: editmovies?.plot?editmovies?.plot:"",
      poster: "",
      actor_id: editmovies?.actor_id?editmovies?.actor_id:"",
      producer_id: editmovies?.producer_id?editmovies?.producer_id:"",
    },
    onSubmit:async values => {
      // alert(JSON.stringify(values, null, 2));
      // const respon = await getMoviesAPI(values)
      try {
        const data = new FormData()
        data.append("name", values.name)
        data.append("year_of_release", values.year_of_release)
        data.append("plot", values.plot)
        data.append("poster", images)
        data.append("actor_id", values.actor_id)
        data.append("producer_id", values.producer_id)

        if(editmovies?._id){
          const respon = await putMoviesAPI(editmovies?._id,data)
          console.log(respon)
          dispatch(editMovies({}))
        }else{
          const respon = await postMoviesAPI(data)
          console.log(respon)
        }        
      } catch (error) {
        console.log(error)
      }
    },
  });
  



  return (
    <div className="list text-[#fff]">

      <div clssName="w-full mx-auto">
        <form onSubmit={formik.handleSubmit}>

          <div className="grid grid-cols-2 justify-items-start  mt-[50px] w-[60%] items-center gap-[20px]">

            <ActorPopup />

            <ProdusersPopup />



          </div>

          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Full Name</label>
            <input
              name="name"
              id="name"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#1f1f1f] text-[#fff] border-2 focus:border-[#fff] focus:outline-none"
            />
          </div>

          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Year of Release</label>
            <input
              name="year_of_release"
              id="year_of_release"
              placeholder="Enter Year of Release"
              onChange={formik.handleChange}
              value={formik.values.year_of_release}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#1f1f1f] text-[#fff] border-2 focus:border-[#fff] focus:outline-none"
            />
          </div>

          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Plot</label>
            <input
              name="plot"
              id="plot"
              placeholder="Enter Plot"
              onChange={formik.handleChange}
              value={formik.values.plot}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#1f1f1f] text-[#fff] border-2 focus:border-[#fff] focus:outline-none"
            />
          </div>


          <div className='grid grid-cols-1'>
            <label className="font-medium text-[15px] my-[15px]">Poster</label>
            <input
              name="poster"
              id="poster"
              type='file'
              onChange={(event)=>setImage(event.target.files[0])}
              value={formik.values.poster}
              className="font-medium text-[15px] h-[50px] py-[10px] px-[20px] rounded-[5px]
            bg-[#ffffff1f] border-[#1f1f1f] text-[#fff] border-2 focus:border-[#fff] focus:outline-none"
            />
          </div>

          <div className='grid grid-cols-2 gap-5 mt-[30px]'>

            <div>

              <span className="font-medium text-[15px] my-[15px]">Select Your Actor</span>

              <select onClick={(e)=> formik.setFieldValue("actor_id", e.target.value)}  className="form-select appearance-none  block w-full px-3 py-1.5  text-base  font-normal text-gray-700
              bg-[#ffffff1f] border-[2px] border-[#ffffff1f] bg-clip-padding text-white outline-none font-medium bg-no-repeat border border-solid border-gray-300 rounded  transition  ease-in-out
                m-0  focus:text-black focus:bg-white focus:border-[#f5f5f5]  focus:outline-none">
                <option selected>Open this select menu</option>
                 { actors?.map((item,i) => 
                <option  value={item._id} >{item.name}</option>
                ) }
              </select>
            </div>

            <div>

              <span className="font-medium text-[15px] my-[15px]">Select Your Producers</span>

              <select onClick={(e)=> formik.setFieldValue("producer_id", e.target.value)} className="form-select appearance-none  block w-full px-3 py-1.5  text-base  font-normal text-gray-700
              bg-[#ffffff1f] border-[2px] border-[#ffffff1f] bg-clip-padding text-white outline-none font-medium bg-no-repeat border border-solid border-gray-300 rounded  transition  ease-in-out
                m-0  focus:text-black focus:bg-white focus:border-[#f5f5f5]  focus:outline-none">
                <option selected>Open this select menu</option>
                { producers?.map((item,i) => 
                <option value={item._id} >{item.name}</option>
                ) }
              </select>
            </div>

          </div>


          <div className='grid grid-cols-1 w-[17%] mt-[3em] text-center'>
            <button type="submit" className="text-[#000] font-medium bg-[#fff]
                           py-[12px] rounded-[5px] px-[50px] hover:opacity-[0.85]">Submit</button>
          </div>


        </form>

       
      </div >


    </div >
  )

}

export default MovieLists;