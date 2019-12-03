<template>
<div class="container-view">
   
    <h4>Laptop ID {{ laptop.id }}</h4>

   <!-- show laptop edit form  -->
   <laptopForm v-bind:laptop="laptop" v-on:laptopFormSubmit="laptopFormSubmit">
       Edit
   </laptopForm>
    <hr>

    <!--show info about which employee this laptop is assigned to  -->
    <div class="table-container">
    <table calss="table table-hover" width="100%">
    <tr>
    <th colspan="3">
    <h5 v-if="laptop.employeeId"> This laptop is assigned to employee
        <router-link :to="{ name: 'employee', params: { id: laptop.employeeId }}">
            #{{ laptop.employeeId }}
        </router-link>
    </h5>
    <h5 v-else>This laptop is not assigned to an employee</h5>
    </th>
    </tr>
    <tr>
    <td colspan="3">
    <!-- select to choose employee -->
    <select class="custom-select" v-model="selectedEmployee">
        <option v-for="employee in employees"
        v-bind:value="employee.id"
        v-bind:key="employee.id">{{ employee.id }} {{ employee.name }}
        </option>
    </select>
    <!--buttons to assign/unassign laptop -->
    </td>
    </tr>
    <tr>
    <td>
    <button class="btn btn-primary mt-2 btn-full-length" v-on:click="updateEmployee">Change Employee</button>
    </td>
    <td>
    <button class="btn btn-primary mt-2 btn-full-length" v-on:click="unassign">Unassign Laptop </button>
    </td>
    <td>
     <!-- delete laptop button -->
    <button class="btn btn-danger mt-2 btn-full-length" v-on:click="deleteLaptop">Delete Laptop</button>
    </td>
    </tr>
    </table>
    </div>
</div>
</template>

<script>

import LaptopForm from '@/components/forms/LaptopForm'

export default {
    name: "Laptop",
    components: {
        LaptopForm
    },
    data() {
        return {
            
            id: undefined,
            laptop: {},
            employees: [],
            selectedEmployee: {}
        }
    },
    mounted() {
        //  get ID from router params 
        // load this laptop's data
        this.id = this.$route.params.id
        this.loadData()
        
    },
    methods:{
        loadData() {
            // load data for laptop, and list of employees 
            this.$services.laptops.getLaptop(this.id).then(data =>{
                this.laptop = data
                this.$services.employees.getAllEmployees().then(data =>{
                    this.employees = data
                    this.selectedEmployee = this.laptop.employeeId
                })
            })
        },

        // handle edit laptop info
        laptopFormSubmit(laptop){
            this.$services.laptops.updateLaptop(laptop).then( () => {
                this.$router.push('/laptops')
            }).catch( err => {
                if(err.response.status == 400){
                    alert('Error editing laptop because '+ err.response.data)
                }else{
                    alert('Error editing laptop')
                }
            })
        },
        // handle assigning laptop to employee
        updateEmployee(){
            if(!this.selectedEmployee){
                alert('Select an employee')
                return
            }
            this.$services.laptops.assignLaptop(this.laptop.id, this.selectedEmployee).then( () => {

            })
        },
        // handle unassigning laptop
        unassign(){
            this.$services.laptops.assignLaptop(this.laptop.id, null).then( () =>{
                this.loadData()
            })
        },
        
        // handle deleting laptop
        deleteLaptop(){
            if(confirm(`Delete laptop with serial number ${this.laptop.serialNumber}?`)){
                this.$services.laptops.deleteLaptop(this.laptop.id).then( () =>{
                    this.$router.push('/laptops')
                })
            }
        }
        
    }
}

</script>

<style>
.custom-select {
  position: relative;
  font-family: Arial;
}
.container-view{
    width: 600px;
    padding: 15px;
    margin-left: 100px;
    margin-top: 50px;
}
.btn-full-length{
    width: 100%;
}
</style>