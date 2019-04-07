import { combineReducers } from "redux";
import CompReducer from "./CompReducer";

const rootReducer = combineReducers({
   companyData:CompReducer
});
export default rootReducer;