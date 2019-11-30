<template>

<div>
<div id="container">
    <h4>Create new laptop</h4>

    <!-- create LaptopForm component, 
    provide slot data to set button text  -->
    <LaptopForm v-on:laptopFormSubmit="laptopFormSubmit">
        Create
    </LaptopForm>
</div>
</div>
</template>

<script>

import LaptopForm from '@/components/forms/LaptopForm'

export default {
    name: 'CreateLaptop',
    components: {
        LaptopForm
    },
    methods:{
        // handle form submit
        laptopFormSubmit(laptop){
            this.$services.laptops.addLaptop(laptop).then( () =>{
                this.$router.push('/laptops')
            }).catch (err => {
                if(err.response.status == 400){
                    alert('Error creating laptops because '+ err.response.data)
                }
                else
                {
                    alert('Error creating laptop')    
                }
              
            })
        },

        // handle cancel 
        cancel(){
            this.$router.push('/laptops')
        }
    }
}

</script>

<style>
#container{
    width:600px;
    margin-left: 100px;
    margin-top: 100px;
    padding:15px;
}
</style>