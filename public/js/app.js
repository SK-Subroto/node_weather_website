
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const icon = document.querySelector('#icon')
const des = document.querySelector('#des')
const temp = document.querySelector('#temp')
const feel = document.querySelector('#feel')
const address = document.querySelector('#address')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    address.textContent = ''
    des.textContent = 'Loading...'
    temp.textContent = ''
    feel.textContent = ''
    icon.src = 'https://thumbs.gfycat.com/AppropriateAgedCoral-size_restricted.gif'
    // icon.setAttribute("hidden", true)
    icon.removeAttribute("hidden")

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                des.textContent = ''
                icon.setAttribute("hidden", true)
                address.textContent = data.error

            } else {
                temp.textContent = data.temperature + "° C"
                icon.src = data.icon
                icon.removeAttribute("hidden")
                des.textContent = data.description
                feel.textContent = "It's feel like " + data.feelslike + "° C"
                address.textContent = data.location
                console.log(data)
            }
        })
    })

    // console.log(location)
})