import Router from 'vue-router'

import components from '@/components'


export default new Router({
    routes: [
        {
            path: '/',
            component: components.Home
        },

        // /employees route
        {
            path: '/employees',
            component: components.EmployeeList
        },
        
        // /laptops route
        {
            path: '/laptops',
            component: components.LaptopList
        },

        // /employee/:id route 
        {
            path: '/employee/:id',
            name: 'employee',
            component: components.Employee
        },

        // /laptop/:id route 
        {
            path: '/laptop/:id',
            name: 'laptop',
            component: components.Laptop
        },
         // /create_employee route 
        {
            path: '/create_employee',
            component: components.CreateEmployee
        },
        
        // /create_laptop route 
        {
            path: '/create_laptop',
            component: components.CreateLaptop
        }
        
    ],
    mode: 'history'
})