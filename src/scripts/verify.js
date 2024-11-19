import axios from "axios";

const doc = document

const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const toast = document.querySelector('.toast')
const text = document.querySelector('.text')

btn.addEventListener('click', async () => {
    try {
        const body = JSON.parse(localStorage.getItem('login-code'))
        console.log({phone:body.phone ,code:+input.value})
        if(body && body.phone){
            const url = 'https://back-dev.elsa-gallery.shop/auth/VerifyCode'
            const res = await axios.post(url, {phone:body.phone ,code:+input.value})
            console.log(res)
            if(res.status === 200) {
                localStorage.setItem('acToken'  ,res.data.data.accessToken);
            }
        }

    }catch (e){
        console.log(e)
        toast.style.border = '1px solid red'
        text.textContent = Array.isArray(e.response.data.message) ? e.response.data.message.join("\n") :e.response.data.message
        setTimeout(()=> {
            toast.style.display = 'none'
        } , 2000)
    }
})
