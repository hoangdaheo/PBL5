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
const getStudentById = async (id)=>{
  return await HandleAPI.APIGet('GetUserID/'+id);
}
const updateStudent = async (params) =>{
  return await HandleAPI.APIPut('ChangInformationStudent',params);
}
const getResultCountByDay = async () =>{
  return await HandleAPI.APIGet("GetResultCountByDay");
}
const ResultService = {
  updateStudent, 
  getResult, 
  getResultWarning, 
  getStudent, 
  getRecentResult, 
  getTempAndTime, 
  getStudentById,
  getResultCountByDay
};

export default ResultService;
