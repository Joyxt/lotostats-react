// src/services/lotoApi.js
// Lecture propre de loto.json au format OpenData FDJ (agrall)

export async function fetchLotoData() {
  const base = import.meta.env.BASE_URL || "/";
  const url = `${base}loto.json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur réseau : ${res.status} (${url})`);
  }

  const raw = await res.json();

  if (!raw.records || !Array.isArray(raw.records)) {
    throw new Error("Format de loto.json invalide : pas de records");
  }

  const ballCounts = {};   // total par boule
  const chanceCounts = {}; // total par numéro chance

  const ballTimeline = {};   // { num: { "2025-09": 3, "2025-10": 1, ... } }
  const chanceTimeline = {}; // idem pour les numéros chance

  const inc = (obj, key) => {
    obj[key] = (obj[key] || 0) + 1;
  };

  for (const rec of raw.records) {
    if (!rec.fields) continue;

    const dateStr = rec.fields.date_de_tirage;
    const ym = dateStr ? dateStr.slice(0, 7) : "unknown"; // "YYYY-MM"

    // Boules 1 à 5
    for (let i = 1; i <= 5; i++) {
      const val = Number(rec.fields[`boule_${i}`]);
      if (Number.isInteger(val)) {
        inc(ballCounts, val);

        if (!ballTimeline[val]) ballTimeline[val] = {};
        inc(ballTimeline[val], ym);
      }
    }

    // Numéro chance
    const chance = Number(rec.fields["numero_chance"]);
    if (Number.isInteger(chance)) {
      inc(chanceCounts, chance);

      if (!chanceTimeline[chance]) chanceTimeline[chance] = {};
      inc(chanceTimeline[chance], ym);
    }
  }

  // Transformer en tableaux triés
  const ballArray = Object.keys(ballCounts).map((n) => ({
    num: Number(n),
    count: ballCounts[n],
    timeline: ballTimeline[n] || {},
  }));
  ballArray.sort((a, b) => b.count - a.count || a.num - b.num);

  const chanceArray = Object.keys(chanceCounts).map((n) => ({
    num: Number(n),
    count: chanceCounts[n],
    timeline: chanceTimeline[n] || {},
  }));
  chanceArray.sort((a, b) => b.count - a.count || a.num - b.num);

  return {
    mostFrequent: ballArray,
    rarest: [...ballArray]
      .sort((a, b) => a.count - b.count || a.num - b.num)
      .slice(0, 5),
    mostFrequentChances: chanceArray,
  };
}
