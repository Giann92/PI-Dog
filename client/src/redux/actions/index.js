import axios from "axios";
import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    ORDER_BY_WEIGHT,
    GET_DOGS_BY_ID,
    GET_DOGS_BY_NAME,
    GET_DETAIL,
    ADD_DOGS,
    FILTER_TEMPERAMENTS,
    SORT,
    FILTER_CREATE
} from "./types";

export function getDogs() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/dogs');
            const dogs = response.data;
            console.log(dogs);
            return dispatch({
                type: GET_DOGS,
                payload: dogs,
            });
        } catch (error) {
            console.log('Error fetching dogs', error);
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/temperaments');
            const temperaments = response.data;
            console.log(temperaments);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments,
            });
        } catch (error) {
            console.log('Error fetching temperaments', error);
        }
    }
}

//  export function getDogsCreateinDB(){
//     return async function(dispacht){
//         try {
//             const response =  await axios.get('http://localhost:3001/dogs');
//             const dogs=response.data.filter((el)=>{
//                 return el.createinDb === true;
//             });

//             return dispacht({
//                 type: GET_DOGS_CREATE_IN_DB,
//                 payload: dogs,
//             });
//         } catch (error) {
//             console.log('Error fetching dogs', error);
//         }
//     }
// }

// export function getDogsForApi(){
//     return async function(dispacht){
//         try {
//             const response =  await axios.get('http://localhost:3001/dogs');
//             const dogs=response.data.filter((el)=>{
//                 return el.createinDb === false;
//             });

//             return dispacht({
//                 type: GET_DOGS_CREATE_IN_DB,
//                 payload: dogs,
//             });
//         } catch (error) {
//             console.log('Error fetching dogs', error);
//         }
//     }
// }
export function getDogById(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/dogs/${id}`);
            const dogs = response.data;
            console.log(dogs);
            return dispatch({
                type: GET_DOGS_BY_ID,
                payload: dogs,
            });
        } catch (error) {
            console.log('Error fetching dogs', error);
        }
    }
}
export const getDetail = (id) => {
    return async function (dispatch) {
        try {
        const response = await axios.get(`http://localhost:3001/dogs/${encodeURIComponent(id)}`);
         const dog = response.data;
            console.log(dog);
            dispatch({
            type: GET_DETAIL,
            payload: dog,
            });
        } 
    catch (error) {
    console.log('Error fetching dog details', error);
    }
      };
    };

export function getDogByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            const dogs = response.data;
            return dispatch({
                type: GET_DOGS_BY_NAME,
                payload: dogs,
            });
        } catch (error) {
           alert('No se encontro perrito');
        }
    }
}
export function addDog(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', payload);
            console.log(response.data);
            dispatch({
                type: ADD_DOGS,
                payload: response.data,
            });
        } catch (error) {
            console.log('Error fetching dogs', error);
        }
    };
}

export function filterDogByTemperaments(payload) {
    return {
        type: FILTER_TEMPERAMENTS,
        payload,
    }
}

export function Sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATE,
        payload,
    }
}
export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}