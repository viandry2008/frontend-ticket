<template>
  <div class="max-w-5xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">Tickets</h2>

    <table class="min-w-full bg-white rounded-lg shadow">
      <thead class="bg-gray-100 text-sm text-gray-600">
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Title</th>
          <th class="px-4 py-2 text-left">University</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Assignee</th>
          <th class="px-4 py-2 text-left">Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id" class="border-t hover:bg-gray-50">
          <td class="px-4 py-2">{{ ticket.id }}</td>
          <td class="px-4 py-2">
            <NuxtLink :to="`/tickets/${ticket.id}`" class="text-blue-600 hover:underline">
              {{ ticket.title }}
            </NuxtLink>
          </td>
          <td class="px-4 py-2">{{ ticket.university }}</td>
          <td class="px-4 py-2">
            <TicketStatusBadge :status="ticket.status" />
          </td>
          <td class="px-4 py-2">{{ ticket.assignee || '—' }}</td>
          <td class="px-4 py-2 text-sm text-gray-500">{{ ticket.updated }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import TicketStatusBadge from '~/components/TicketStatusBadge.vue'

const tickets = ref([
  {
    id: "U-1001",
    title: "GiGA credits sync",
    university: "Universitas Jakarta Timur (UNIJAT)",
    status: "Pending",
    assignee: null,
    updated: "8/28/2025, 10:00:00 AM"
  }
])
</script>
