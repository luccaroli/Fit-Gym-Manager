const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

let totalPages = 20, 
    selectedPages = 15,
    pages = [],
    oldPage

for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPages + 2 
    const pagesBeforeSelectedPage = currentPage >= selectedPages - 2 

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
        
        if(oldPage && currentPage - oldPage > 2) {
            pages.push("...")

        }
        if(oldPage && currentPage - oldPage == 2) {
            pages.push(oldPage + 1)

        }
            pages.push(currentPage)

            oldPage = currentPage
    }

}

console.log(pages)

const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event) {
    const confirmation = confirm("Deseja Excluir?")
    if (!confirmation) {
        event.preventDefault()
    }
})