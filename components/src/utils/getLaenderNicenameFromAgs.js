const map = {
  "01": "Schleswig-Holstein",
  "02": "Hamburg",
  "03": "Niedersachsen",
  "04": "Bremen",
  "05": "Nordrhein-Westfalen",
  "06": "Hessen",
  "07": "Rheinland-Pfalz",
  "08": "Baden-Württemberg",
  "09": "Bayern",
  10: "Saarland",
  11: "Berlin",
  12: "Brandenburg",
  13: "Mecklenburg-Vorpommern",
  14: "Sachsen",
  15: "Sachsen-Anhalt",
  16: "Thüringen",
}

/**
 * Get nicename for land ags
 * @param {string} ags
 * @returns {string} nicename
 */
const getLaenderNicenameFromAgs = (ags) => map[ags]

export default getLaenderNicenameFromAgs
