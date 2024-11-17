import axios from "axios";

const doc = document

const input = document.querySelector('.input')
const btn = document.querySelector('.btn')

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
        console.log(e.response.data.message.forEach(x=>console.log(x)))
        alert()
    }
})
