console.log("✅ script.js loaded");

fetch("./verbs.json")
  .then(res => {
    if (!res.ok) throw new Error("HTTP error " + res.status);
    return res.json();
  })
  .then(data => {
    console.log("✅ verbs.json fetched:", data.length, "entries");
    document.getElementById("prefixes").innerHTML = "<p>✅ JSON loaded successfully.</p>";
  })
  .catch(err => {
    console.error("❌ Fetch failed:", err);
    document.getElementById("prefixes").innerHTML = "<p>❌ JSON load error.</p>";
  });
