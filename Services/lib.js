import { AsyncStorage,Platform } from 'react-native'
const BASE_URL = 'http://18.220.177.244/grocaryapp/index.php?route=restapi'

export const getToken = async()=>{
    let token = await AsyncStorage.getItem('token')
    return token
}

export const addToCart=(params)=>{
    let form  = new FormData()
    form.append('cart_items',JSON.stringify(params))
    return fetch(`${BASE_URL}/checkout/cart/add`,{
        body:form,
        method:"POST"
    })
}

export const uploadPhoto = (file, token)=>{
    form = new FormData()
    form.append('file',file)
    form.append('token',token)
    if(Platform.OS=='ios'){
        return fetch(`${BASE_URL}/common/filemanager/profile_imageupload_ios`,{
            method:'POST',
            body:form
        })
    }else{
        return fetch(`${BASE_URL}/common/filemanager/profile_imageupload`,{
            method:'POST',
            body:form
        })

    }
}
