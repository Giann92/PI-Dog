import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_ID,
  GET_DOGS_BY_NAME,
  GET_DETAIL,
  ADD_DOGS,
  FILTER_TEMPERAMENTS,
  SORT,
  FILTER_CREATED,
  ORDER_BY_WEIGHT
} from "../actions/types";

const initialState = {
  dogs: [],
  allDogs: [],
  detail: [],
  temperaments: [],

}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_DOGS_BY_ID:
      return {
        ...state,
        dogs: [action.payload]
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
      case ADD_DOGS:
        return {
          ...state,
          allDogs: [...state.allDogs, action.payload],
        }
      case FILTER_TEMPERAMENTS:
        console.log('Action Payload:', action.payload);
  
        const allDogs = state.allDogs;
        console.log('All Dogs:', allDogs);
  
        // If the selected payload is "temperaments", show all dogs
        if (action.payload === "temperaments") {
          return {
            ...state,
            dogs: allDogs,
          };
        }
  
        // Filter the dogs based on selected temperament
        const filterTemperaments = allDogs.filter((el) => el.temperament && el.temperament.includes(action.payload));
        console.log('Filter Result:', filterTemperaments);
  
        return {
          ...state,
          dogs: filterTemperaments,
        };
        case FILTER_CREATED:
          const filterCreated = action.payload === "Creados"
            ? state.allDogs.filter((el) => el.createdinDb === true)
            : state.allDogs;
          return {
            ...state,
            dogs: action.payload === "Todos" ? state.allDogs : filterCreated,
          };
    
        case SORT:
          if (action.payload === "FILTRO") {
            return {
              ...state,
              dogs: state.allDogs, // Si el payload es "FILTRO", volvemos al orden original
            };
          }
          
          let sortedByName = [...state.dogs];
          sortedByName = sortedByName.sort((a, b) => {
            if (action.payload === "A-Z") {
              return a.name.localeCompare(b.name); // Ordenar de A a Z usando el método localeCompare
            } else if (action.payload === "Z-A") {
              return b.name.localeCompare(a.name); // Ordenar de Z a A usando el método localeCompare
            } else {
              return 0;
            }
          });
          
          return {
            ...state,
            dogs: sortedByName,
          };
    
        case ORDER_BY_WEIGHT:
          if (action.payload === "Peso") {
            return {
              ...state,
              dogs: state.allDogs, // Si el payload es "Peso", volvemos al orden original
            };
          }
    
          let filteredByWeight = [...state.dogs];
          filteredByWeight = filteredByWeight.sort((a, b) => {
            const weightA = parseFloat(a.weight);
            const weightB = parseFloat(b.weight);
    
            if (action.payload === "Menor peso") {
              return weightA - weightB;
            } else if (action.payload === "Mayor peso") {
              return weightB - weightA;
            } else {
              return 0;
            }
          });
    
          return {
            ...state,
            dogs: filteredByWeight,
          };
    
        default:
          return state;
      }
    };
    
    export default rootReducer;