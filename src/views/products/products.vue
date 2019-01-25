<template>
  <div>
    <banner />

    <div class="page-container">
      <divide />
      <div class="productList">
          <single-product v-for="(item,index) in products" :key="index" :info="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProduct from './singleProduct';
import Divide from './brand/divide';
import banner from '@/components/Banner/banner';

export default {
  name: 'Products',
  components: { SingleProduct, Divide, banner },
  data() {
    return {
      products: [
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        },
        {
          photo: '',
          title: 'Product Name',
          summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam perspiciatis, dicta necessitatibus laborum velit repudiandae nisi officiis labore est architecto quasi cupiditate odit? Minima est voluptatum minus vel. Nisi, autem.'
        }
      ]
    };
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.photo {
  border: 1px solid #000;
  height: 200px;
  margin-bottom: 20px;
}
.productList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
