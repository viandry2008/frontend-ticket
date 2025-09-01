<template>
  <div class="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
    <!-- Ticket Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-xl font-semibold">{{ ticket.title }}</h2>
        <p class="text-sm text-gray-500">
          {{ ticket.university }} · Created {{ ticket.created }}
        </p>
      </div>
      <TicketStatusBadge :status="ticket.status" />
    </div>

    <!-- Conversation -->
    <div class="space-y-4">
      <div v-for="(msg, i) in ticket.conversation" :key="i" class="p-3 rounded-md border bg-gray-50">
        <p class="text-sm font-medium">{{ msg.sender }} <span class="text-xs text-gray-400">· {{ msg.time }}</span></p>
        <p class="text-sm text-gray-700">{{ msg.text }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex gap-2">
      <button class="px-3 py-2 bg-red-600 text-white rounded-lg">Escalate</button>
      <button class="px-3 py-2 bg-gray-600 text-white rounded-lg">Close</button>
      <button class="px-3 py-2 bg-green-600 text-white rounded-lg">Mark Resolved</button>
    </div>
  </div>
</template>

<script setup>
import TicketStatusBadge from '~/components/TicketStatusBadge.vue'

const ticket = reactive({
  id: "U-2001",
  title: "Lecturer onboarding issue",
  university: "Universiti Malaya (UM)",
  status: "In Progress",
  created: "8/28/2025, 9:47:24 AM",
  conversation: [
    { sender: "Dr. Lina - Lecturer", text: "Error when adding lecturer.", time: "8/28/2025, 9:47 AM" },
    { sender: "OPU Admin (UM)", text: "Investigating with WoW support.", time: "8/28/2025, 11:57 AM" }
  ]
})
</script>
