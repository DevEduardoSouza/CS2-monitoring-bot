export const filter = (data, sportId) => {
  return data.filter((item) => item.SSI === sportId);
};

const formatLiveScore = (match) => {
  const liveScore = match.SC?.PS;
  if (!liveScore || liveScore.length === 0) {
    return "Placar ao Vivo: N/A";
  }

  const lastMapScore = liveScore[liveScore.length - 1]?.Value;
  if (!lastMapScore) {
    console.log("Aqui");
    return "Placar ao Vivo: N/A";
  }

  const { NF, S1, S2 } = lastMapScore;
  const formattedScore = `${S1 !== undefined ? S1 : 0} x ${
    S2 !== undefined ? S2 : 0
  }`; // Substitui undefined por 0
  return `(${NF}): ${formattedScore}`;
};

export const formatMatchMessage = (match) => {
  const tournamentName = match.L;
  const eventType = match.SE;
  const totalMaps = match.MIO?.MaF || "N/A";
  const team1 = match.O1;
  const team2 = match.O2;
  const currentMap = match.SC.CP;
  const previousMaps = match.SC.PS;
  const oddsTeam1 = match.E[0]?.C || "🚫";
  const oddsTeam2 = match.E[1]?.C || "🚫";
  const formattedLiveScore = formatLiveScore(match);

  let message = `🏆 ${tournamentName}\n\n`;
  message += `🎮 ${eventType}\t\t🗺️ ${totalMaps}\n`;

  if (previousMaps.length > 0 && currentMap > 1) {
    message += "\nMapas anteriores.\n\n";
    previousMaps.forEach((map) => {
      const mapKey = map.Key;
      const mapDetails = map.Value;
      if (mapDetails.S1 !== undefined) {
        message += `- Mapa ${mapKey}: ${team1} ${mapDetails.S1} x ${team2} ${mapDetails.S2}\n`;
      }
    });
  }

  message += `\n\n`;

  message += `🔹 ${team1} | Odds: ${oddsTeam1}\n`;
  message += `🔸 ${team2} | Odds: ${oddsTeam2}\n`;
  message += `🌐 Mapa Atual: ${currentMap}\n`;

  const liveScore = match.SC?.PS;
  const lastMapScore = liveScore[liveScore.length - 1]?.Value;
  const { NF, S1, S2 } = lastMapScore;
  
  // Verifica se S1 e S2 são undefined e os substitui por 0
  const formattedS1 = S1 !== undefined ? S1 : 0;
  const formattedS2 = S2 !== undefined ? S2 : 0;
  
  message += `\n🔴 Placar ao Vivo: ${team1} ${formattedS1} ✖️ ${formattedS2} ${team2} \n`;

  message +=
    "----------------------------------------------------------------------\n\n";

  return message;
};
