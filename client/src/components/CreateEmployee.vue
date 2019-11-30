<template>
<div>
<div id="display-container">
    <h4>Create New Employee</h4>

    <EmployeeForm v-on:employeeFormSubmit="employeeFormSubmit">
        Create
    </EmployeeForm>
</div>
    
</div>
</template>

<script>

import EmployeeForm from '@/components/forms/EmployeeForm'

export default {
    name: 'CreateEmployee',
    components: {
        EmployeeForm
    },
    methods: {
        employeeFormSubmit(employee) {
            this.$services.employees.addEmployee(employee).then( () => {
                this.$router.push('/employees')
            })
        },
        cancel() {
            this.$router.push('/employees')
        }
    }
}

</script>

<style scope>
#display-container{
    width:600px;
    padding:15px;
    margin-left:100px;
    margin-top: 100px;
}
</style>