

export const LOGOIMG = '/src/images/logo.svg'
export const SPRITE = '/src/images/sprite.svg'

export const API_URL= 'https://api.escuelajs.co/api/v1'

export const buildUrl = (url, params) =>{
    let urlWithParams = url

    Object.entries(params).forEach(([key, value], i)=>{
        const sign = !i ? '?' : '&'
        urlWithParams += `${sign}${key}=${value}`
    })

    return urlWithParams;
}