export default function ({ $axios }, inject) {
    // put requests
    inject("putRequest", async (val) => {
        const res = await $axios.put(val.path, val.payload)
        return res
    });
    // get requests 
    inject("getRequest", async (val) => {
        const res = await $axios.get(`${val.path}${val.payload ? val.payload : ''}`, val?.config)
        return res
    });
    // delete requests 
    inject("deleteRequest", async (val) => {
        const res = await $axios.delete(`${val.path}${val.payload ? val.payload : ''}`)
        return res
    });
    // post requests
    inject("postRequest", async (val) => {
        const res = await $axios.post(val.path, val.payload, val?.config)
        return res
    });
    // get user chat
    inject("getUserChat", async (payload, source) => {
        const res = await $axios.post('chat', payload, { cancelToken: source.token })
        return res
    });
}
