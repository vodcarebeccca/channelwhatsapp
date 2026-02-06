// Di Vercel, Anda harus mengatur Environment Variables:
// VITE_TELEGRAM_BOT_TOKEN
// VITE_TELEGRAM_CHAT_ID
// VITE_ADMIN_PASSWORD
// Nilai di bawah ini adalah fallback jika env tidak ditemukan (untuk testing)

export const TELEGRAM_CONFIG = {
  // Menggunakan import.meta.env untuk kompatibilitas dengan Vite/Modern bundlers
  // Jika berjalan di lingkungan tanpa build step, string fallback akan digunakan.
  botToken: ((import.meta as any).env && (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN) || "8576202664:AAHpSb7F1NGmwaVld76NIpZZptDqlSJVAR4",
  chatId: ((import.meta as any).env && (import.meta as any).env.VITE_TELEGRAM_CHAT_ID) || "8576202664",
};

export const ADMIN_CONFIG = {
  password: ((import.meta as any).env && (import.meta as any).env.VITE_ADMIN_PASSWORD) || "admin123"
};