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
      const response = await post(`/account/forgotten`, sendData)
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
        return response.products;
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

  async joinevent(data) {
    try {
      return await post(`/guest`, data)
    } catch (e) {
      console.log(e)
    }
  },

  async uploadPhoto(data) {
    try {
      return await post(`/photo`, data)
    } catch (e) {
      console.log(e)
    }
  },

  async broadcast(data) {
    try {
      return await post(`/broadcast`, data)
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

  async eventInfo(code) {
    try {
      const response = await get(`/event/${code}`)
      return response
    } catch (e) {
      console.log(e)
    }
  },

  async eventurl(code) {
    try {
      const response = await get(`/event/url/${code}`)

      console.log(response)
      return response
    } catch (e) {
      console.log(e)
    }
  }
}