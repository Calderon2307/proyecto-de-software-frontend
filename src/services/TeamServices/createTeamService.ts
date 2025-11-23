import api from "../Api/api";

export const createTeamService = async (body: any) => {
  try {
    const response = await api.post("/equipo/create", body);
    return response.data;
  } catch (error: any) {
    console.error("Error creando el equipo:", error.response || error);
    throw error;
  }
};
