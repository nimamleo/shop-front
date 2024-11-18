import axios from "axios";

const doc = document

const input = document.querySelector('.input')
const btn = document.querySelector('.btn')

btn.addEventListener('click', async () => {
    console.log(input.value)
    try {
        const url = 'https://back-dev.elsa-gallery.shop/auth/sendCode'
        const phone = input.value
        const res = await axios.post(url, {phone:phone})
        console.log(res.status)
        if(res.status === 200) {
            const code = localStorage.getItem("login-code")
            if(!code){
                localStorage.setItem('login-code'  ,JSON.stringify( {
                    code: res.data.data.code,
                    phone: phone
                }))
            }
            if(res.data.data.ttl >10){
                input.value = ''
                window.location.href="/verify"

            }
        }

    }catch (e){
        console.log(e)
    }
})
