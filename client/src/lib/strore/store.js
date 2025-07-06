import {configureStore} from "@reduxjs/toolkit" 
import Purityslice from "../strore/Slices/puritySlice"
import rateslice from "../strore/Slices/RateSlice"

const store =configureStore({
    reducer:{
        Purity:Purityslice,
        Rate:rateslice
    }
})

export default store