const JSON_URL = "verbs.json";

async function fetchData() {
  const res = await fetch(JSON_URL);
  return await res.json();
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// --- ホームページ（index.html） ---
if (document.getElementById("prefixes")) {
  document.getElementById("prefixes").innerHTML = `<h2>接頭辞</h2><p>読み込み中...</p>`;
  document.getElementById("roots").innerHTML = `<h2>基幹部分</h2><p>読み込み中...</p>`;

  fetchData().then(data => {
    // --- 接頭辞を分離性ごとに分類 ---
    const groups = { 分離: new Set(), 非分離: new Set(), 両方: new Set() };

    data.forEach(d => {
      if (d["接頭辞"] && d["分離性"]) {
        const type = d["分離性"];
        if (groups[type]) groups[type].add(d["接頭辞"]);
      }
    });

    // --- ラベルとアイコン設定 ---
    const labels = {
      分離: { icon: "🟩", text: "trennbar" },
      非分離: { icon: "🟥", text: "untrennbar" },
      両方: { icon: "🟨", text: "teils trennbar" }
    };

    // --- HTML生成 ---
    const sectionHTML = Object.entries(groups).map(([key, set]) => {
      const sorted = [...set].sort((a, b) => a.localeCompare(b, "de"));
      if (sorted.length === 0) return "";
      return `
        <h3>${labels[key].icon} ${labels[key].text}</h3>
        <ul>
          ${sorted.map(p => `<li><a href="list.html?prefix=${p}">${p}</a></li>`).join("")}
        </ul>
      `;
    }).join("");

    document.getElementById(
