import { combineReducers } from "redux";
import { actorsReducer } from "./ActorReducer";
import { edit_moviesReducer } from "./Edit_MoviesReducer";
import { moviesReducer } from "./MoviesReducer";
import { producersReducer } from "./ProducersReducer";



export const rootReducer = combineReducers({

    movies:moviesReducer,
    actors:actorsReducer,
    producers:producersReducer,
    editmovies: edit_moviesReducer,

 
});