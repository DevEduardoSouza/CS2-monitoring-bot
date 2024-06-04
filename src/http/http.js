import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get(
      "https://br.1x001.com/service-api/LiveFeed/Get1x2_VZip?sports=40&count=20&lng=br&gr=395&mode=4&country=31&partner=132&getEmpty=true&virtualSports=true&noFilterBlockEvent=true"
    );
    return response.data.Value;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return [];
  }
};
