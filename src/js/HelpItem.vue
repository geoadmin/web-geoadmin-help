<template>
    <div class="help-item">
        <h2 v-if="!item.isHomepage()">{{ item.title }}</h2>
        <div v-html="item.content"></div>
        <img v-if="item.image" v-bind:alt="item.title" v-bind:src="item.image" />
    </div>
</template>
<script>
    export default {
      props: ['item']
    };
</script>
