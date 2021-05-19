import HandleAPI from "../HandleAPI";

const getResult = async () => {
  return await HandleAPI.APIGet("Result");
};
const getResultWarning = async () => {
  return await HandleAPI.APIGet("ResultWarning");
};
const getStudent = async ()=>{
  return await HandleAPI.APIGet("GetUser");
}
const getRecentResult = async ()=>{
  return await HandleAPI.APIGet("RecentResult");
}
const getTempAndTime = async (id,time)=>{
  return await HandleAPI.APIGet('TempAndTime/'+id+'/'+time);
}
const ResultService = { getResult, getResultWarning, getStudent ,getRecentResult, getTempAndTime};

export default ResultService;
