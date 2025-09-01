<template>
  <span
    class="px-3 py-1 rounded-full text-xs font-medium"
    :class="badgeClass"
  >
    {{ status }}
  </span>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  switch (props.status) {
    case 'Open':
    case 'Pending':
      return 'bg-gray-100 text-gray-800 border border-gray-300'
    case 'Assigned':
      return 'bg-blue-100 text-blue-800 border border-blue-300'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    case 'Resolved':
      return 'bg-green-100 text-green-800 border border-green-300'
    case 'Closed':
      return 'bg-red-100 text-red-800 border border-red-300'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})
</script>
