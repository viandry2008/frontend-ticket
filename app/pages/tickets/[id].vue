<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
    <!-- Ticket Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ ticket.title }}</h2>
        <p class="text-sm text-gray-500">
          {{ ticket.university }} · Created {{ ticket.created }}
        </p>
        <p class="text-xs text-gray-400">
          Updated {{ ticket.updated }} · Assigned to <span class="font-medium text-gray-700">{{ ticket.assigned }}</span>
        </p>
      </div>
      <div class="flex gap-2">
        <span class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium shadow-sm">
          Urgent
        </span>
        <span class="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium shadow-sm">
          {{ ticket.status }}
        </span>
      </div>
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
    <div class="mt-8 flex flex-wrap gap-3 relative">
      <!-- Assign Dropdown -->
      <div class="relative">
        <button
          @click="showAssignMenu = !showAssignMenu"
          class="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow hover:shadow-lg transition"
        >
          📌 Assign ▾
        </button>
        <div
          v-if="showAssignMenu"
          class="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg z-10"
        >
          <ul class="text-sm text-gray-700">
            <li
              v-for="(user, i) in assignableUsers"
              :key="i"
              @click="assignTo(user)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ user }}
            </li>
          </ul>
        </div>
      </div>

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

    <!-- Reply Box -->
    <div class="mt-6 flex items-center gap-3">
      <input
        type="text"
        placeholder="Write a reply..."
        class="flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
      />
      <button
        class="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow hover:shadow-lg transition"
      >
        ➤ Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const showAssignMenu = ref(false)

const ticket = reactive({
  id: "U-2001",
  title: "Lecturer onboarding issue",
  university: "Universiti Malaya (UM)",
  reporter: "Dr. Lina",
  status: "In Progress",
  created: "8/28/2025, 9:47:24 AM",
  updated: "8/28/2025, 1:53:30 PM",
  assigned: "Afiq (Support)",
  conversation: [
    {
      sender: "Dr. Lina - Lecturer",
      text: "Error when adding lecturer.",
      time: "8/28/2025, 9:47:24 AM"
    },
    {
      sender: "OPU Admin (UM) - University Admin",
      text: "Investigating with WoW support.",
      time: "8/28/2025, 11:57:24 AM"
    }
  ]
})

const assignableUsers = [
  "OPU Admin (UM)",
  "Afiq (Support)",
  "Nadia (Manager)"
]

function assignTo(user) {
  ticket.assigned = user
  showAssignMenu.value = false
}
</script>
