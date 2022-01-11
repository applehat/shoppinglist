import axiosClient from './axiosClient'

/**
 * Handle the response from API calls
 * @param {object} data 
 */
function handleResponse(data){
    if (data.error) {
        console.error(data.error)
    } else {
        console.log(data.success)
    }
}

/**
 * Delete an item from the dataset
 * @param {string} id 
 */
export async function deleteItem(id){
    console.log(`Deleting item ${id}`)
    try {
        const { data } = await axiosClient.delete(`/documents/${id}`)
        handleResponse(data)
    } catch (error) {
        console.error(error.message)
    }
}

/**
 * Patch / Update an item in the Dataset
 * @param {string} id 
 * @param {object} patch 
 */
export async function updateItem(id, patch) {
    console.log(`Updating item ${id}`)
    try {
        const { data } = await axiosClient.patch(`/documents/${id}`, patch)
        handleResponse(data)
    } catch (error) {
        console.error(error.message)
    }
}

/**
 * Create a new item in the Dataset
 * @param {object} newItem 
 */
export async function createItem(newItem) {
    console.log(`Creating new item`)
    if (!newItem._type) {
        newItem._type = 'item'
    }
    try {
        const { data } = await axiosClient.post(`/documents`, newItem)
        handleResponse(data)
    } catch (error) {
        console.error(error.message)
    }
}


