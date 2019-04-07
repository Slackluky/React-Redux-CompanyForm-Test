
    const initialState =  [
              {
                "companyname":"Google",
                "address":"Ohio, USA",
                "revenue":999,
                "code":'+62',
                "phonumb":8172381623,
                "id":"asd12",
                offices:[
                  {
                  "officename": "Jakarta Office",
                  "Oid": 'cr0t',
                  "lat":23.0,
                  "log": -71,
                  "startdate": "2019-01-01"
                }
              ]
              },
            ] ;


    const CompReducer=(state = initialState, action ={}) => {
      
      switch (action.type) {
        case "LOAD":
        return state = action.company

        case "FILTERED_LOAD":
        return state.filter(value=>{
          return value.id === "asd12";
        });
        case 'REMOVE':
        return state.filter((company) => company.id !== action.id)

        case 'CREATE':
        return state.concat([action.company])

        case 'CREATE_OFFICE':
        return state.map(function(state) {
        if (state.id === action.id) {
        return {
        ...state,
          ...state.offices.push(action.offici)
        }
        } else return state;
        
        })
        case 'REMOVE_OFFICE':
        return state.map((state) => {
          if (state.id === action.id) {
          return {
          ...state,
            ...state.offices,
            offices: [
              ...state.offices.filter(offices => offices.Oid !== action.Oid, console.log(state))
            ]
            
          }
          } else return state;
        }
        
        )
        
        default:
          return state;
        
      }
    }
    
    export default CompReducer;