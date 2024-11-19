import axios from "axios";

const doc = document

const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const toast = document.querySelector('.toast')
const text = document.querySelector('.text')

btn.addEventListener('click', async () => {
    console.log(input.value)
    try {
        const url = 'https://back-dev.elsa-gallery.shop/auth/sendCode'
        const phone = input.value
        const res = await axios.post(url, {phone:phone})
        if(res.status === 200) {
            const code = localStorage.getItem("login-code")
            if(!code){
                localStorage.setItem('login-code'  ,JSON.stringify( {
                    code: res.data.data.code,
                    phone: phone
                }))
            }
            if(res.data.data.ttl >10){
                toast.style.border = '1px solid green'
                text.textContent = "code sent successfully"
                setTimeout(()=>{

                window.location.href="/verify"
                } , 2000)
            }
        }

    }catch (e){
        toast.style.border = '1px solid red'
        text.textContent = Array.isArray(e.response.data.message) ? e.response.data.message.join("\n") :e.response.data.message
        setTimeout(()=> {
            toast.style.display = 'none'
        } , 2000)
    }
})
