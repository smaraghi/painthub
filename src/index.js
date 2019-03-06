document.addEventListener("DOMContentLoaded", init)

function init() {
    getPainter()
    getPaintings()

    let updateForm = document.getElementById("painter-form")
    updateForm.addEventListener('submit', editPainterBio)

    let addForm = document.getElementById("add-painting-form")
    addForm.addEventListener('submit', addPainting)

}

function getPainter(){
    fetch("http://localhost:3000/painter")
    .then(res => res.json())
    .then(renderPainter)
}

function renderPainter(painter){
    painter = painter[0]

    let bioDiv = document.querySelector('#bio')

    let h2 = document.createElement('h2')
    let pBio = document.createElement('p')
    let pContact = document.createElement('p')

    h2.classList.add('painter-name')
    pBio.classList.add('painter-bio')
    pContact.classList.add('painter-contact')
 

    h2.innerText = painter.name
    pBio.innerText = painter.bio
    pContact.innerText = painter.contact
    

    bioDiv.append(h2, pBio, pContact)

    //following is to populate values into update form

    document.getElementsByName('contact')[0].value = painter.contact
    document.getElementsByName('bio')[0].value = painter.bio
    document.getElementById('form-id').value = painter.id

}

function editPainterBio(e){
    e.preventDefault()
    let id = document.getElementById('form-id').value

    let data = {
        bio: document.getElementById('form-bio').value,
        contact: document.getElementById('form-contact').value
    }

    fetch(`http://localhost:3000/painter/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(updatePainter)
    
}

function updatePainter(painter) {
    
    let painterBio = document.getElementsByClassName('painter-bio')[0]
    let painterContact = document.getElementsByClassName('painter-contact')[0]
 
    painterBio.innerText = painter.bio
    painterContact.innerText = painter.contact
}

//---------------------------- Painting functions below ----------------------------------//

function getPaintings() {
    fetch("http://localhost:3000/paintings")
    .then(res => res.json())
    .then(paintings => paintings.forEach(renderAllPaintings))
}

function renderAllPaintings(painting) {
    
    let rightPanel = document.getElementsByClassName("right-panel")[0]

    let paintingDiv = document.createElement('div')
    let h4 = document.createElement('h4')
    let img = document.createElement('img')

    h4.classList.add("painting-title")
    img.classList.add("painting-img")
    paintingDiv.classList.add("painting")

    h4.innerText = painting.title
    img.src = painting.image

    paintingDiv.append(img, h4)
    rightPanel.appendChild(paintingDiv)
    
    paintingDiv.addEventListener('click', () => {deletePainting(painting)
        paintingDiv.remove()
    })

}

function addPainting(){
    event.preventDefault()
    
    let data = {
        title: document.getElementById('form-title').value,
        image: document.getElementById('form-image').value,
        painterId: document.getElementById('form-painter-id').value
    }

    fetch("http://localhost:3000/paintings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(renderAllPaintings)

}

function deletePainting(painting) {
    fetch(`http://localhost:3000/paintings/${painting.id}`, {
        method: "DELETE"
    })
}
