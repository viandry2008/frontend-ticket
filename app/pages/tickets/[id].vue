<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
    <!-- Ticket Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ ticket.title }}</h2>
        <p class="text-sm text-gray-500">
          {{ ticket.university }} · Created {{ ticket.created }}
        </p>
      </div>
      <TicketStatusBadge :status="ticket.status" />
    </div>

    <!-- Conversation -->
    <div class="space-y-4">
      <div
        v-for="(msg, i) in ticket.conversation"
        :key="i"
        class="flex"
        :class="msg.sender.includes('Admin') ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-md px-4 py-3 rounded-2xl shadow-sm"
          :class="msg.sender.includes('Admin')
            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
            : 'bg-gray-100 text-gray-800'"
        >
          <p class="text-sm font-semibold">
            {{ msg.sender }}
            <span class="text-xs ml-2 opacity-70">{{ msg.time }}</span>
          </p>
          <p class="text-sm mt-1">{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-8 flex flex-wrap gap-3">
      <button
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-red-500 to-red-600 shadow hover:shadow-lg transition"
      >
        🚨 Escalate
      </button>
      <button
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 shadow hover:shadow-lg transition"
      >
        ✖ Close
      </button>
      <button
        class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow hover:shadow-lg transition"
      >
        ✅ Mark Resolved
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import TicketStatusBadge from '~/components/TicketStatusBadge.vue'

const ticket = reactive({
  id: "U-2001",
  title: "Lecturer onboarding issue",
  university: "Universiti Malaya (UM)",
  status: "In Progress",
  created: "8/28/2025, 9:47:24 AM",
  conversation: [
    {
      sender: "Dr. Lina - Lecturer",
      text: "Error when adding lecturer.",
      time: "8/28/2025, 9:47 AM"
    },
    {
      sender: "OPU Admin (UM)",
      text: "Investigating with WoW support.",
      time: "8/28/2025, 11:57 AM"
    }
  ]
})
</script>
