<template>
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
</template>

<script>
import Vue from 'vue'
import { TreeSelect } from 'vant'

Vue.use(TreeSelect)

export default {
  i18n: {
    'zh-CN': {
      group1: '所有城市',
      group2: '浙江',
      group3: '江苏',
      city1: [{
        text: '杭州',
        id: 1001
      }, {
        text: '温州',
        id: 1002
      }, {
        text: '宁波',
        id: 1003
      }, {
        text: '义乌',
        id: 1004
      }],
      city2: [{
        text: '无锡',
        id: 1011
      }, {
        text: '常州',
        id: 1012
      }, {
        text: '莆田',
        id: 1013
      }, {
        text: '三明',
        id: 1014
      }]
    },
    'en-US': {
      group1: 'All',
      group2: 'Group1',
      group3: 'Group2',
      city1: [{
        text: 'Delaware',
        id: 1001
      }, {
        text: 'Florida',
        id: 1002
      }, {
        text: 'Georqia',
        id: 1003
      }, {
        text: 'Indiana',
        id: 1004
      }],
      city2: [{
        text: 'Alabama',
        id: 1011
      }, {
        text: 'Kansas',
        id: 1012
      }, {
        text: 'Louisiana',
        id: 1013
      }, {
        text: 'Texas',
        id: 1014
      }]
    }
  },
  data () {
    return {
      mainActiveIndex: 0,
      activeId: 1001,
      cites: {
        group0: '所有城市',
        group1: '浙江',
        group2: '江苏',
        city1: [{
          text: '杭州',
          id: 1001
        }, {
          text: '温州',
          id: 1002
        }, {
          text: '宁波',
          id: 1003
        }, {
          text: '义乌',
          id: 1004
        }],
        city2: [{
          text: '无锡',
          id: 1011
        }, {
          text: '常州',
          id: 1012
        }, {
          text: '莆田',
          id: 1013
        }, {
          text: '三明',
          id: 1014
        }]
      }
    }
  },
  created: function () {
    console.log(this.$t('city1'))
    // console.log(this.$t('city1'))
  },
  computed: {
    items () {
      return [{
        text: this.cites.group0,
        children: [...this.cites.city1, ...this.cites.city2]
      }, {
        text: this.cites.group1,
        children: this.cites.city1
      }, {
        text: this.cites.group2,
        children: this.cites.city2
      }]
    }
  },
  methods: {
    onNavClick (index) {
      this.mainActiveIndex = index
    },
    onItemClick (data) {
      this.activeId = data.id
    }
  }
}
</script>

<style>
.van-tree-select {
  height: 100% !important;
}

.van-tree-select > div {
  height: 100% !important;
}
</style>
