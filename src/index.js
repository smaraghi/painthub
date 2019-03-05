document.addEventListener("DOMContentLoaded", init)

function init() {
    getPainter()
}

function getPainter(){
    fetch("http://localhost:3000/painter")
    .then(res => res.json())
    .then(json => renderPainter(json))
}

function renderPainter(painter){
    painter = painter[0]
    
    let bioDiv = document.querySelector('#bio')

    let h2 = document.createElement('h2')
    let pBio = document.createElement('p')
    let pContact = document.createElement('p')
    let editBtn = document.createElement('button')

    h2.classList.add('painter-name')
    pBio.classList.add('painter-bio')
    pContact.classList.add('painter-contact')
    editBtn.classList.add('edit-btn')

    h2.innerText = painter.name
    pBio.innerText = painter.bio
    pContact.innerText = painter.contact
    editBtn.innerText = "Update Info"

    bioDiv.append(h2, pBio, pContact, editBtn)
}