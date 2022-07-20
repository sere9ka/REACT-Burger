import { checkResponse } from "./checkResponse"

export const getData = async (url) => {
    return await fetch(url, {mode: 'cors'})
      .then(checkResponse)
      .catch(err => console.error(err))
      .catch(e => console.log(`Что-то пошло не так. Ошибка: ${e}`))
  }
