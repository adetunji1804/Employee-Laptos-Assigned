Summary.vue

<template>
    <!-- component give a summary of number of laptop assigned to each employee -->
    <div class="summary">
        <p id="laptopId" v-if="hasLaptop">
            {{ total }}
        </p>
    </div>

</template>

<script>
export default {
    name :'Summary',
    props: {
        total: Number,
        hasLaptop: Boolean
    },
    computed: {
        hasLaptop(){
            //check if number of laptop assigned is greater than zero
            return this.total > 0 ? 'total' : 'No laptops'
        }
    }
}
</script>

<style scoped>
/*
#visited-all{
    color:#be8234;

}*/
</style>