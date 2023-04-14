var app = new Vue({
    el: '#app',
    data: {
        deleteIndex: null,
        insertName: '',
        insertCity: '',
        updateName: '',
        updateCity: '',
        updateIndex: null,
        users: [],
        usersService: null
    },
    created: function () {
        this.usersService = users();
        this.usersService.get().then(response => (this.users = response.data));
    },
    methods: {
        deleteFun:function(){
            axios.delete(`http://localhost:3000/users/:${this.deleteIndex}`)
            .then(response => {console.log(response.data); })   // "User with index {index} was deleted"
            .catch(error => {
            console.error(error);
            });
            location.reload();
        },
        insertFun:function(){
            console.log(this.insertName);
            console.log(this.insertCity);
            const name=this.insertName;
            const city=this.insertCity;
            const date = { name, city};
            const options = {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(date)
            };
            
            fetch('http://localhost:3000/users', options)
                .then(response => response.json())
                .then(date => console.log(date))
                .catch(error => console.error(error));
            location.reload();
        },
        updateFun:function(){
            console.log(this.updateName);
            console.log(this.updateCity);
            const name=this.updateName;
            const city=this.updateCity;

            axios.put(`http://localhost:3000/users/update/:${this.updateIndex}`,{name,city})
            .then(response => {console.log(response.data); })   // "User with index {index} was deleted"
            .catch(error => {
            console.error(error);
            });
            //location.reload();
        }
    }
})