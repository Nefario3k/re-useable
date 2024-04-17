export default function ({ $axios, redirect, }) {
    $axios.onError(err => {
        if (err?.response && err.response?.status === 403 && err.response?.data?.error?.code == 'account_disabled') {
            redirect('/account-disabled')
        }
    })
    $axios.onResponseError(err => {
    })
}