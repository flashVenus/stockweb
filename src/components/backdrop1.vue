<template>
  <div class="backdrop" >
      <div :class="color == 'black-bg'?'black-bg-bgd':'red-bg-bgd'">
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
	  console.log(this.color)
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
// .backdrop{
//   position: relative;
//   top: -17px;
  
// }

 .black-bg .black-bg-bgd{
    position: absolute;
    top: -110px;
    width: 100%;
    height: 757px;  
    background: url(../../static/newimg/bgdrop0.png) no-repeat center ; 
    background-size: contain;
  }

.red-bg  .red-bg-bgd{
    position: absolute;
    top: -110px;
    width: 100%;
    height: 300px;  
    color: #000;
    background-color: rgb(233, 233, 233);
    // background: url(../../static/newimg/bgdrop.png) no-repeat center center;
  
    // background-size: contain;
  }
</style>
