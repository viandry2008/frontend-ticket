// plugins/status.client.js
export default defineNuxtPlugin((nuxtApp) => {
  const statusClasses = {
    in_progress: "bg-blue-100 text-blue-600",
    assigned: "bg-indigo-100 text-indigo-600",
    closed: "bg-gray-100 text-gray-600",
    resolved: "bg-green-100 text-green-600",
    escalated: "bg-red-100 text-red-600",
  }

  function formatStatus(status) {
    if (!status) return ""
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  function getStatusClass(status) {
    return statusClasses[status] || "bg-gray-100 text-gray-600"
  }

  nuxtApp.provide("formatStatus", formatStatus)
  nuxtApp.provide("getStatusClass", getStatusClass)
})
