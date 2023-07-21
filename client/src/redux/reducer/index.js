import { GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOGS_BY_ID,
    GET_DOGS_BY_NAME,
    GET_DETAIL,
    ADD_DOGS,
    FILTER_TEMPERAMENTS,
    SORT,
    FILTER_CREATE,
    ORDER_BY_WEIGHT} from "../actions/types";

const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
    temperaments: [],

}

const rootReducer = (state = initialState, action)=> {
    switch (action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload,
            };
        case GET_DOGS_BY_ID:
            return{
                ...state,
                dogs:[action.payload]
            };
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogs:[action.payload],
            };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload,
            };
            case FILTER_CREATE:
                const filterCreate = action.payload === "Creados"
                  ? state.allDogs.filter((el) => el.createdinDb === true)
                  : state.allDogs;
                return {
                  ...state,
                  dogs: action.payload === "Todos" ? state.allDogs : filterCreate
                };
            case SORT:
                let orderName=[...state.dogs];
                orderName = orderName.sort((a,b)=>{
                    if(a.name < b.name){
                        return action.payload === "ASCENDENTE" ? -1 : 1;
                    }
                    if(a.name > b.name){
                        return action.payload === "DESCENDENTE" ? 1 : -1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs: action.payload === "FILTRO" ? state.allDogs : orderName
                };
            case ADD_DOGS:
                return{
                    ...state,
                    allDogs: [...state.allDogs, action.payload],
                }
                case FILTER_TEMPERAMENTS:
                    const allDogs = state.allDogs;
                    const filterTemperaments = action.payload === "Todos" ? allDogs : allDogs.filter((el) => {
                      if (Array.isArray(el.temperaments)) {
                        return el.temperaments.includes(action.payload);
                      }
                      return false;
                    });
                    return {
                      ...state,
                      dogs: filterTemperaments,
                    };
                  
            case ORDER_BY_WEIGHT:
                let filterWeight = [...state.allDogs];
                filterWeight = filterWeight.sort((a,b)=>{
                    if(a.weight > b.weight){
                        return action.payload === "Mayor Peso" ? -1 : 1;
                    }
                    if(a.weight < b.weight){
                        return action.payload === "Menor peso" ? 1 : -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    dogs: action.payload === "Peso" ? state.allDogs : filterWeight
                };
        default: return state;
    }

}

export default rootReducer;