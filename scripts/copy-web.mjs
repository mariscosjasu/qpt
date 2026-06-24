/**
 * Copia los archivos de la PWA (que viven en la raíz) a la carpeta "www",
 * que es la que Capacitor empaqueta dentro del APK.
 *
 * Así mantenemos la web lista para GitHub Pages en la raíz y, a la vez,
 * generamos el contenido del APK sin duplicar nada a mano.
 */
import { cpSync, rmSync, mkdirSync, existsSync } from "node:fs";

const OUT = "www";
const ITEMS = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "sw.js",
  "icons",
];

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const item of ITEMS) {
  if (!existsSync(item)) {
    console.error("Falta el archivo:", item);
    process.exit(1);
  }
  cpSync(item, `${OUT}/${item}`, { recursive: true });
}

console.log("Web copiada a ./" + OUT + " (" + ITEMS.length + " elementos).");
