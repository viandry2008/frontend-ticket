<template>
  <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        🎟️ Tickets
      </h2>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tickets..."
            class="w-64 rounded-xl border border-gray-200 pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <svg
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </div>

        <!-- Create Ticket -->
        <NuxtLink
          to="/tickets/create"
          class="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow hover:shadow-lg transition duration-200"
        >
          + Create Ticket
        </NuxtLink>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <thead class="bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left font-medium">ID</th>
            <th class="px-4 py-3 text-left font-medium">Title</th>
            <th class="px-4 py-3 text-left font-medium">University</th>
            <th class="px-4 py-3 text-left font-medium">Status</th>
            <th class="px-4 py-3 text-left font-medium">Assignee</th>
            <th class="px-4 py-3 text-left font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="border-t hover:bg-gray-50 transition duration-150"
          >
            <td class="px-4 py-3 font-semibold text-gray-700">{{ ticket.id }}</td>
            <td class="px-4 py-3">
              <NuxtLink
                :to="`/tickets/${ticket.id}`"
                class="text-purple-600 hover:underline font-medium"
              >
                {{ ticket.title }}
              </NuxtLink>
            </td>
            <td class="px-4 py-3 text-gray-700">{{ ticket.university }}</td>
            <td class="px-4 py-3">
              <TicketStatusBadge :status="ticket.status" />
            </td>
            <td class="px-4 py-3 text-gray-600">{{ ticket.assignee || '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-500">{{ ticket.updated }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TicketStatusBadge from '~/components/TicketStatusBadge.vue'

const searchQuery = ref("")

const tickets = ref([
  {
    id: "U-1001",
    title: "GiGA credits sync",
    university: "Universitas Jakarta Timur (UNIJAT)",
    status: "Pending",
    assignee: null,
    updated: "8/28/2025, 10:00:00 AM"
  },
  {
    id: "U-1002",
    title: "Database migration issue",
    university: "Universitas Bandung Barat",
    status: "In Progress",
    assignee: "Admin-1",
    updated: "8/30/2025, 02:00:00 PM"
  }
])

const filteredTickets = computed(() => {
  if (!searchQuery.value) return tickets.value
  return tickets.value.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    ticket.university.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
