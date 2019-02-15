import { get, post, remove } from './index'
export default {

  async register(sendData) {
    try {
      const response = await post(`/account/register`, sendData)
      return response
    } catch (e) {
      console.log(e)
      return {}
    }
  },

  async login(sendData) {
    try {
      const response = await post(`/account/login`, sendData)
      return response
    } catch (e) {
      console.log(e)
      return {}
    }
  },

  async forgot(sendData) {
    try {
      const response = await post(`/account/forgotten/forgotemail`, sendData)
      return response
    } catch (e) {
      console.log(e)
      return {}
    }
  },

  async getCategory() {
    try {
      const response = await get(`/product/product/getCategorylist`)
      if (response.status == 'success') {
        // const data = omit(response, 'error', 'message')
        const data= response.categories;
        return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getSubCategory(catId) {
    try {
      const response = await get(`/product/category&path=${catId}`)
      console.log("service sub cat ",response)
      if (response.status == 'success') {
        return response;
        // const data = omit(response, 'error', 'message')
        // const data= response.categories;
        // return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getProducts(formData) {
    try {
      const response = await post(`/product/product/getproductlist`, formData)
      if (!response.error) {
        console.log(response)
        const data = response.product_list
        return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getGroceries() {
    try {
      const response = await post(`/module/store/groceries`)
      if (!response.error) {
        const data = response.restaurants
        return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getProductDetails(prodId) {
    try {

      const response = await get(`/product/product&product_id=${prodId}`)
      if (!response.error) {
        return response;
      }
    } catch (e) {
      return []
    }
  },

  async getCommonOffer() {
    try {
      const response = await get(`/product/product/getofferlist`)
      if (!response.error) {
        return response;
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getOfferBanner() {
    try {
      const response = await post(`/product/product/getOfferbannerslide`)
      if (!response.error) {
        const data = omit(response, 'error', 'message')
        return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getPromotionsSlide(storeId) {
    try {
      const response = await get(`/product/product/getofferslide&store_id=${storeId}`)
      if (!response.error) {
        return response;
      }
      return []
    } catch (e) {
      return []
    }
  },

async getOfferBanner(formData) {
  try {
    const response = await post(`/account/wishlist/addfav`,FormData)
    if (!response.error) {
    return response;
    }
    return []
  } catch (e) {
    return []
  }
},

  async getAccount(token) {
    try {
      const response = await get(`/account/account/userdetails&token=${token}`)
      // console.log(response)
      if (!response.error) {
        // const data = omit(response, 'error', 'message')
        // return Object.keys(data).map(key => data[key])
        return response.user_details
      }
    } catch (e) {
      return []
    }
  },

  async getOrders(token) {
    try {
      const response = await get(`/account/order/index&token=${token}`)
      // console.log(response)
      if (!response.error) {
        // const data = omit(response, 'error', 'message')
        // return Object.keys(data).map(key => data[key])
        return response
      }
    } catch (e) {
      return []
    }
  },

  async sendFeedback(formdata) {
    try {
      const response = await post(`/information/feedback/submit`,formdata)
      if (!response.error) {
        return response
      }
      return []
    } catch (e) {
      return []
    }
  },

  async saveAddress(formdata) {
    try {
      const response = await post(`/account/account/addaddress`,formdata)
      if (!response.error) {
        return response
      }
      return []
    } catch (e) {
      return []
    }
  },

  async getEazybuySplash(lang,cont) {
    try {
      const response = await get(`/account/web&language_id=${lang}&content_id=${cont}`)
      // console.log(response)
      if (!response.error) {
        // const data = omit(response, 'error', 'message')
        // return Object.keys(data).map(key => data[key])
        return response
      }
    } catch (e) {
      return []
    }
  },

  async logout(formdata) {
    try {
      const response = await post(`/account/logout`,formdata)
      console.log("logout",response)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async addAddress(formdata) {
    try {
      const response = await post(`/account/account/addAddress`,formdata)
      console.log("addAddress",response)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async suggest(formdata) {
    try {
      const response = await post(`/product/product/suggestProduct`,formdata)
      // console.log("suggest",response)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async listAddress(token) {
    try {
      const response = await post(`/account/account/listAddress&token=${token}`)
      // console.log("suggest",response)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async editAddress(formData) {
    try {
      const response = await post(`/account/account/editAddress`,formData)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async getCartItems(token) {
    try {
      const response = await get(`/checkout/cart/cartlisting&token=${token}`)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async addStoreRating(formData) {
    try {
      const response = await post(`/account/account/adduserrating`,formData)
      return response;
      // if (!response.error) {
      //   return response
      // }
      // return []
    } catch (e) {
      return []
    }
  },

  async getAllPhotos(userId) {
    try {
      const response = await get(`/photo/user/${userId}`)
      if (!response.error) {
        const data = omit(response, 'error', 'message')
        return Object.keys(data).map(key => data[key])
      }
    } catch (e) {
      return []
    }
  },

  async getEvenetPhotos(eventCode) {
    try {
      const response = await get(`/photo/event/${eventCode}`)
      if (!response.error) {
        const data = omit(response, 'error', 'message')
        return Object.keys(data).map(key => data[key])
      }
      return []
    } catch (e) {
      return []
    }
  },

  async createEvent(event) {
    try {
      const response = await post(`/event`, event)
      return response
    } catch (e) {
      console.log(e)
      return {}
    }
  },



  async uploadPhoto(data) {
    try {
      return await post(`/photo`, data)
    } catch (e) {
      console.log(e)
    }
  },



  async deleteEvent(data) {
    try {
      const response = await remove(`/guest/${data.guest_id}`)
      return response
    } catch (e) {
      console.log(e)
    }
  },


}
