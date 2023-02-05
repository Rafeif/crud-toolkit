import { createSlice } from "@reduxjs/toolkit";


export const BookSlice=createSlice({
name:'books',
initialState:{
    items:[],
},
reducers:{
    addBook:(state,action)=>{
state.items.push(action.payload)
    },
    deletBook :(state,action)=>{
state.items=state.items.filter(item=>
    item.id !==action.payload.id)
    },
    updateBooks :(state,action)=>{
        
        state.items.map((item) => {
        if(item.id===action.payload.id)
            {
          item.title=action.payload.title;
              item.author=action.payload.author;
              item.desc=action.payload.desc; } 
            
              }  )
    }
}
})
export default BookSlice.reducer;
export const {addBook,deletBook,updateBooks}=BookSlice.actions