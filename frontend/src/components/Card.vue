<template>
  <c-box :backgroundColor="active ? 'white' : 'blue.100'" animationDuration="1s" :class="active ? 'card' : 'card active'"
    w="90px" shadow="md" rounded="lg" p="5">
    <c-text color paddingY="30px" fontSize="3xl" fontWeight="bold" align="center">
      {{ value }}
    </c-text>
  </c-box>
</template>
<script>
import Vue from "vue";
import { CBox, CText } from "@chakra-ui/vue";
export default Vue.extend({
  name: "Card",
  components: {
    CBox,
    CText,
  },
  props: ["value", "active"],
});
</script>

<style>
.card.active {
  background-color: #FA6800;
}

.card {
  background-color: #073293;
  color: #fff;
  transition-duration: 0.2s;
  border-radius: 10px;
}

.grow {
  cursor: pointer;
}
</style>
