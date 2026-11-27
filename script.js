const tombol = document.getElementById("tombol");
const jarakAman = 20; // jarak (px) sebelum tombol kabur
const langkah = 70;   // jauhnya tombol bergeser (px)

// Jarak dari kursor ke tepi tombol pada posisi (x, y)
function hitungJarak(mx, my, x, y, w, h) {
  const dx = Math.max(x - mx, 0, mx - (x + w));
  const dy = Math.max(y - my, 0, my - (y + h));
  return Math.hypot(dx, dy);
}

function kabur(e) {
  const r = tombol.getBoundingClientRect();
  if (hitungJarak(e.clientX, e.clientY, r.left, r.top, r.width, r.height) > jarakAman) return;

  const maksX = window.innerWidth - r.width;
  const maksY = window.innerHeight - r.height;
  let terbaik = { x: r.left, y: r.top, jarak: -1 };

  // Mulai dari geseran pendek, diperbesar hanya jika belum aman (misalnya di pojok)
  for (let s = langkah; s <= 300 && terbaik.jarak <= jarakAman; s += 20) {
    // Coba 16 arah, pilih yang paling jauh dari kursor
    for (let i = 0; i < 16; i++) {
      const sudut = (i / 16) * Math.PI * 2;
      const x = Math.min(Math.max(r.left + Math.cos(sudut) * s, 0), maksX);
      const y = Math.min(Math.max(r.top + Math.sin(sudut) * s, 0), maksY);
      const jarak = hitungJarak(e.clientX, e.clientY, x, y, r.width, r.height);
      if (jarak > terbaik.jarak) terbaik = { x, y, jarak };
    }
  }

  tombol.style.transform = "none";
  tombol.style.left = terbaik.x + "px";
  tombol.style.top = terbaik.y + "px";
}

// Event mouse dan sentuhan
document.addEventListener("pointermove", kabur);
document.addEventListener("pointerdown", kabur);