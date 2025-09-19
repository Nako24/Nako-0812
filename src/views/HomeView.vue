<template>
  <v-container>
    <ProductList />
  </v-container>
</template>

<script>
  import ProductList from '@/components/ProductList.vue' //ProductList.vueをインポート

  export default {
    name: 'ProductList',

    components: {
      ProductList,
    },
  }
</script>
