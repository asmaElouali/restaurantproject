import axios, { AxiosRequestConfig } from "axios";

///////////////////////////////Auhorization function//////////////////////////////////////////////////

export const Authorization = async () => {
     try {
          const res = await axios.get(`http://192.168.100.57:3333/autorize`);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

///////////////////////////////Authentication function//////////////////////////////////////////////////

export const Authentication = async () => {
     try {
          const res = await axios.post(`http://192.168.100.57:3333/signin`);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

///////////////////////////////////////Token function//////////////////////////////////////////////////

export const Token = async () => {
     try {
          const res = await axios.post(`http://192.168.100.57:3333/token`);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

////////////////////////////////////////Menu function//////////////////////////////////////////////////

export const GetMenu = async () => {
     try {
          const config : AxiosRequestConfig ={
               headers:{
                    'Simphony-LocRef':'ghp',
                    'Simphony-OrgShortName': 'HEU',
                    'Simphony-RvcRef': 11
               }
          };
          const res = await axios.get(`http://192.168.100.57:3333/Menu`,config);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

////////////////////////////////////////Family Group function//////////////////////////////////////////////////

export const GetFamilyGroup = async () => {
     try {
          const config : AxiosRequestConfig ={
               headers:{
                    'Simphony-LocRef':'ghp',
                    'Simphony-OrgShortName': 'HEU',
                    'Simphony-RvcRef': 11
               }
          };
          const res = await axios.get(`http://192.168.100.57:3333/family_group`,config);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

////////////////////////////////////////Family Group function//////////////////////////////////////////////////

export const GetMenuItemByFamily= async (familyGroupRef:Number) => {
     try {
          const config : AxiosRequestConfig ={
               headers:{
                    'Simphony-LocRef':'ghp',
                    'Simphony-OrgShortName': 'HEU',
                    'Simphony-RvcRef': 11
               }
          };
          const res = await axios.get(`http://192.168.100.57:3333/menuItems/${familyGroupRef}`,config);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}

////////////////////////////////////////Tender Media function//////////////////////////////////////////////////

export const TenderMedia = async () => {
     try {
          const res = await axios.get(`http://192.168.100.57:3333/tender`);
          return res;
     } catch (error) {
          if (axios.isAxiosError(error)) {
               console.error("Axios error:", error.message);
               console.error("Error code:", error.code);
               console.error("Error response:", error.response);
               console.error("Error request:", error.request);
          } else {
               console.error("Unexpected error:", error);
          }
          throw error;
     }
}
