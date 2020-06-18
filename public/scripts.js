const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}















// const modalOverlay = document.querySelector('.modal-overlay')
// const cards = document.querySelectorAll('.card')

// for (let card of cards) {
//     card.addEventListener("click", function(){
//         const videoId = card.getAttribute('id')
//         modalOverlay.classList.add('active')
//         modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`

//     })
// }

// document.querySelector('.close-modal').addEventListener("click", function(){
//     modalOverlay.classList.remove('active')
//     modalOverlay.querySelector('iframe').src = ''
// })
