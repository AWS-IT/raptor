/**
 * «Живой» фон: медленно плывущие приглушённые пятна света, лёгкое зерно и сетка.
 * Чистый CSS — не нагружает процессор. При системной настройке
 * «уменьшить движение» анимация останавливается.
 */
export default function LiveBackground() {
  return (
    <div className="live-bg" aria-hidden>
      <div className="live-bg__blob live-bg__blob--a" />
      <div className="live-bg__blob live-bg__blob--b" />
      <div className="live-bg__blob live-bg__blob--c" />
      <div className="live-bg__grid" />
      <div className="live-bg__grain" />
    </div>
  );
}
