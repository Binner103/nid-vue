<template>
  <div>欢迎访问HONGBIN.NET：） {{isLoggedIn}}</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  }
}
</script>