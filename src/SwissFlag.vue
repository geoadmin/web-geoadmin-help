<template>
    <img class="swiss-flag" :src="swissFlagIcon" alt="swiss-flag" @click="$emit('click', $event)" />
</template>

<script>
import swissFlagIcon from '@/assets/svg/swiss-flag.svg'

export default {
    emits: ['click'],
    data() {
        return {
            swissFlagIcon,
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap-grid.scss';

.swiss-flag {
    height: 24px;
}
@include media-breakpoint-up(lg) {
    .swiss-flag {
        height: 34px;
    }
}
</style>
