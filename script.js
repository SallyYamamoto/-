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
    const groups = { 分離: new Set(), 非分離: new Set(), 両方: new Set() };

    data.forEach(d => {
      if (d["接頭辞"] && d["分離性"]) {
        const type = d["分離性"];
        if (groups[type]) groups[type].add(d["接頭辞"]);
      }
    });

    const labels = {
      分離: { icon: "🟩", text: "trennbar" },
      非分離: { icon: "🟥", text: "untrennbar" },
      両方: { icon: "🟨", text: "teils trennbar" }
    };

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

    document.getElementById("prefixes").innerHTML = `<h2>接頭辞</h2>${sectionHTML}`;

    const roots = [...new Set(data.map(d => d["基幹"]))].sort((a, b) => a.localeCompare(b, "de"));
    const rootHTML = `
      <h2>基幹部分</h2>
      <ul>
        ${roots.map(r => `<li><a href="list.html?root=${r}">${r}</a></li>`).join("")}
      </ul>
    `;
    document.getElementById("roots").innerHTML = rootHTML;
  }).catch(err => {
    document.getElementById("prefixes").innerHTML = "読み込みに失敗しました。";
    console.error(err);
  });
}

// --- 一覧ページ（list.html） ---
if (document.getElementById("verbs")) {
  document.getElementById("verbs").innerHTML = `<p>読み込み中...</p>`;

  fetchData().then(data => {
    const prefix = getQueryParam("prefix");
    const root = getQueryParam("root");

    let filtered = [];
    let title = "";

    if (prefix) {
      filtered = data.filter(d => d["接頭辞"] === prefix);
      title = `接頭辞: ${prefix}`;
    } else if (root) {
      filtered = data.filter(d => d["基幹"] === root);
      title = `基幹部分: ${root}`;
    }

    document.getElementById("title").textContent = title;

    // --- 接頭辞別に固定カラー設定 ---
    const prefixColors = {
      ab: "#5cb85c",
      an: "#0275d8",
      auf: "#3f51b5",
      aus: "#009688",
      dar: "#ba68c8",
      her: "#ff7043",
      ein: "#f0ad4e",
      fest: "#d9534f",
      um: "#607d8b",
      vor: "#0288d1",
      zurück: "#8e44ad",
      zusammen: "#16a085",
      nach: "#c2185b",
      bei: "#6dab6d",
      bereit: "#00796b",
      be: "#8d6e63",
      ent: "#ad4c4c",
      ver: "#9e9e9e",
      zu: "#795548"
    };

    const listHTML = filtered.map(item => {
      const prefixColor = prefixColors[item["接頭辞"]] || "#607d8b";
      return `
        <div class="col">
          <h3 style="background-color:${prefixColor};">${item["単語"]}</h3>
          <div class="section"><b><span>意味</span>：</b> ${item["意味"]}</div>
          <div class="section"><b><span>英訳</span>：</b> ${item["英訳"]}</div>
          <div class="section"><b><span>接頭辞</span>：</b> ${item["接頭辞"]}（${item["接頭辞基本意味"] || ""}）</div>
          <div class="section"><b><span>語感</span>：</b> ${item["語感"] || ""}</div>
          <div class="section"><b><span>構文</span>：</b> <i>${item["構文"] || ""}</i></div>
          <div class="section"><b><span>分離性</span>：</b> ${item["分離性"] || ""}</div>
          <div class="section"><b><span>活用</span>：</b> ${item["活用"] || ""}</div>
          <div class="section"><b><span>例文</span>：</b><br>
            ${item["例文1"] || ""}<br>（${item["日本語訳1"] || ""}）<br><br>
            ${item["例文2"] || ""}<br>（${item["日本語訳2"] || ""}）
          </div>
          <div class="section"><b><span>派生語</span>：</b> ${item["派生語"] || ""}</div>
        </div>
      `;
    }).join("");

    document.getElementById("verbs").innerHTML =
      listHTML || `<p>該当する単語がありません。</p>`;
  }).catch(err => {
    document.getElementById("verbs").innerHTML = `<p>データの読み込みに失敗しました。</p>`;
    console.error(err);
  });
}
