const fs = require("fs");
const path = require("path");

const base = process.env.API_BASE || "https://zijemevzidech.cz/api/json/";
const out = path.join(__dirname, "../data/static-paths.json");

async function run() {
  const menu = await fetch(`${base}menu`).then((r) => {
    if (!r.ok) throw new Error(`menu ${r.status}`);
    return r.json();
  });

  const categories = menu.map(({ slug }) => ({ category: slug }));
  const entries = [];

  for (const { slug: category } of menu) {
    const list = await fetch(`${base}entries/c/${category}`).then((r) => {
      if (!r.ok) throw new Error(`entries/${category} ${r.status}`);
      return r.json();
    });
    for (const { slug: entry } of list) {
      entries.push({ category, entry });
    }
  }

  const odvodo = await fetch(`${base}entries/c/odvodo`).then((r) => {
    if (!r.ok) throw new Error(`odvodo ${r.status}`);
    return r.json();
  });
  const lists = odvodo.map(({ slug }) => ({ list: slug }));

  fs.writeFileSync(out, JSON.stringify({ categories, entries, lists }, null, 2) + "\n");
  console.log(`Wrote ${entries.length} entries, ${lists.length} map lists → ${out}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
