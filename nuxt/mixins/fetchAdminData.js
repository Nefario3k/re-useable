export default {
    methods: {
        async fetchAdmin() {
            await this.$axios.get('users/my-profile').then(res => {
                this.$auth.setUser(res.data.data)
            })
        }
    }
}