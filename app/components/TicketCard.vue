<template>
  <div
    class="bg-white rounded-lg shadow hover:shadow-md p-4 cursor-pointer border border-gray-100 flex justify-between items-center"
    @click="$emit('click', ticket.id)"
  >
    <div>
      <h3 class="text-base font-semibold text-gray-900">
        {{ ticket.title }}
      </h3>
      <p class="text-sm text-gray-500">
        {{ ticket.university }}
      </p>
      <p class="text-xs text-gray-400">Updated: {{ ticket.updated }}</p>
    </div>
    <div class="flex flex-col items-end space-y-2">
      <TicketStatusBadge :status="ticket.status" />
      <span class="text-xs text-gray-500">{{ ticket.assignee || '—' }}</span>
    </div>
  </div>
</template>

<script setup>
import TicketStatusBadge from '~/components/TicketStatusBadge.vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})
</script>
