<template>
    <div class="help-item" v-bind:id="'help-' + item.id">
        <h2 v-if="!item.isHomepage()">{{ item.title }}</h2>
        <p v-html="item.content"></p>
        <img v-if="item.image" v-bind:alt="item.title" v-bind:src="item.image" />
    </div>
</template>
<script>
    export default {
      props: ['item']
    };
</script>
