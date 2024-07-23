<template>
  <c-light-mode>
    <div :key="member.id">
      <c-box
        :class="member.hidden ? '' : 'animate__animated animate__flipInY'"
        backgroundColor="#FA6800"
        animationDuration="1s"
        w="90px"
        shadow="md"
        rounded="lg"
        p="5"
      >
        <c-text paddingY="30px" fontSize="3xl" fontWeight="bold" align="center" style="color: white">
          <c-text v-if="member.hidden"> ‎ </c-text>
          <c-text v-else >
            {{ $store.getters.deck[member.card] }}
          </c-text>
        </c-text>
      </c-box>
      <c-text marginTop="1em" paddingX="5px" paddingY="3px" style="border-radius: 25px;" backgroundColor="#fff" >
        <i class="fa fa-user"></i>
        <span :class="member.id !== me.id || 'b'">
          {{ member.name }}
        </span>
      </c-text>
    </div>
  </c-light-mode>
</template>
<script>
import { CBox, CText, CLightMode } from "@chakra-ui/vue";

export default {
  name: "TableCard",
  components: {
    CBox,
    CText,
    CLightMode,
  },
  props: ["member"],
  computed: {
    me() {
      return this.$store.getters.members.find(
        (mem) => mem.id == this.$socket.id
      );
    },
  },
};
</script>

<style scoped>
.mini {
  margin: 0px auto;
  font-size: 1em !important;
}
</style>
