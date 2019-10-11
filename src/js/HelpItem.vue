<template>
    <div class="help-item">
        <h2 v-if="!item.isHomepage()">{{ item.title }}</h2>
        <div v-html="item.content"></div>
    </div>
</template>
<script>
    export default {
      props: ['item']
    };
</script>
