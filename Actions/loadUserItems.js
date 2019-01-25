// export const UPDATE_CART = 'cartItems.updateCart'
//
// export function castAddActions(newCart){
//   return (
//     type: 'UPDATE_CART',
//     payload: {
//       cartItems : newCart}
//   )
// }

export const loadUserItems = () => {
  return function(dispatch) {
    var item = {
  "name":"John",
  "age":30,
  "cars": [
    { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
    { "name":"BMW", "models":[ "320", "X3", "X5" ] },
    { "name":"Fiat", "models":[ "500", "Panda" ] }
  ]
 }
    const items =  item
    dispatch(loadItems(items));
  }
}

function loadItems(data) {
  return {
    type: LOAD_USER_ITEMS,
    payload: data
  };
}
