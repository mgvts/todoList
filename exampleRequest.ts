import axios from "axios";

interface BasePetObj {
    id: number
    name: string
}

interface PetCategory extends BasePetObj {}

interface PetTag extends BasePetObj {}

type PetStatus = 'available' | 'pending' | 'sold'


interface Pet extends BasePetObj {
    category: PetCategory
    photoUrls: string[]
    tags: PetTag[]
    status: PetStatus
}


export async function axiosGet<T>(url: string): Promise<T> {
    return (await axios.get( url, {
        baseURL: 'https://petstore3.swagger.io/api/v3'
    })).data
}

axiosGet<Pet[]>('/pet/findByStatus?status=available').then(response => {
    console.log(response)
    console.log(response.length)
})
