

const cartItems = (state = [], action) => {
  console.log("PAYLOAD",action.payload)
  switch(action.type){
      case 'ADD_CART' :
      console.log("PAYLOAD",action.payload)
       return [...state, ...action.payload]

  }
  return state;
};


export default cartItems;
