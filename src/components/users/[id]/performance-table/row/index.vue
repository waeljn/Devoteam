<template>
  <tr>
    <th scope="row">
      <a class="with-pointer" @click="$emit('open-modal', objective.id)">
        {{ objective.name }}
      </a>
    </th>
    <td>{{ objective.weight * 100 }}</td>
    <td>
      <span
        class="with-pointer badge mr-1"
        @click="$emit('gate-clicked', { id: objective.id, value: 25 })"
        :class="objective.value === 25 ? 'bg-danger' : 'bg-default'"
      >
        25%
      </span>
      <span
        class="with-pointer badge bg-default mr-1"
        @click="$emit('gate-clicked', { id: objective.id, value: 50 })"
        :class="objective.value === 50 ? 'bg-warning' : 'bg-default'"
      >
        50%
      </span>
      <span
        class="with-pointer badge bg-default mr-1"
        @click="$emit('gate-clicked', { id: objective.id, value: 75 })"
        :class="objective.value === 75 ? 'bg-primary' : 'bg-default'"
      >
        75%
      </span>
      <span
        class="with-pointer badge bg-default"
        @click="$emit('gate-clicked', { id: objective.id, value: 100 })"
        :class="objective.value === 100 ? 'bg-success' : 'bg-default'"
      >
        100%
      </span>
    </td>
    <td>{{ objective.n1 }}</td>
    <td>{{ objective.n }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    objective: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
