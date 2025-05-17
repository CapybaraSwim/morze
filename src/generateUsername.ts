export function getOrCreateUsername(): string {
  const key = "morse_guest_name";
  let saved = localStorage.getItem(key);
  if (!saved) {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    saved = `Аноним_${randomId}`;
    localStorage.setItem(key, saved);
  }
  return saved;
}