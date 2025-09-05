// plugins/dateFormat.js
export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (dateStr) => {
        if (!dateStr) return "—"
        const d = new Date(dateStr)
        return d.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      }
    }
  }
})
