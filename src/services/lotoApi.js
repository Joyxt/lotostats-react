// src/services/lotoApi.js
function toIntSafe(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s.length) return null;
  const digits = s.replace(/[^\d-]/g, "");
  const n = parseInt(digits, 10);
  return Number.isNaN(n) ? null : n;
}

function extractFromRecord(rec) {
  const r = rec && rec.fields ? rec.fields : rec;
  let numbers = [];
  if (Array.isArray(r.numbers) && r.numbers.length) numbers = r.numbers.map(toIntSafe).filter(x => x !== null);
  else if (Array.isArray(r.numeros) && r.numeros.length) numbers = r.numeros.map(toIntSafe).filter(x => x !== null);
  else {
    const b1 = toIntSafe(r.boule_1 ?? r.boule1);
    const b2 = toIntSafe(r.boule_2 ?? r.boule2);
    const b3 = toIntSafe(r.boule_3 ?? r.boule3);
    const b4 = toIntSafe(r.boule_4 ?? r.boule4);
    const b5 = toIntSafe(r.boule_5 ?? r.boule5);
    numbers = [b1,b2,b3,b4,b5].filter(x => x !== null);
  }
  const maybeChance = r.numero_chance ?? r.luckyNumber ?? r.chance ?? null;
  const chance = toIntSafe(maybeChance);
  const date = r.date_de_tirage ?? r.date ?? null;
  return { date, numbers, chance };
}

export async function getDraws() {
  try {
    const resp = await fetch("/lotostats-react/loto.json");
    if (!resp.ok) throw new Error(`Erreur HTTP ${resp.status}`);
    const raw = await resp.json();
    let records = [];
    if (Array.isArray(raw)) records = raw;
    else if (raw && Array.isArray(raw.records)) records = raw.records;
    else records = [raw];

    const draws = records.map(rec => {
      const { date, numbers, chance } = extractFromRecord(rec);
      if (!Array.isArray(numbers) || numbers.length === 0) return null;
      return { date: date || null, numbers, chance: chance === null ? null : chance };
    }).filter(Boolean);

    draws.sort((a,b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date) - new Date(a.date);
    });

    return draws;
  } catch (err) {
    console.error("lotoApi.getDraws erreur:", err);
    return [];
  }
}
