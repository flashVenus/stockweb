<template>
  <div class="backdrop" >
      <div class="bgdrop">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  
  name: 'backdrop',
  components: {
  },
  props: {
    isbgd:{
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
      ...mapState({
      color:(state)=>state.systemColor
    })
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.backdrop{
  width: 100%;  
}
 .bgdrop{
    position: absolute;
    top: 0;
		left: 0;
    width: 100%;
    height: 757px;  
    background: url(../../static/newimg/bgdrop0.png) no-repeat center ;
    background-size: 100% 100%;
  }

</style>
