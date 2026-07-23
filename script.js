const main = document.getElementById("main")
const writeCard = document.getElementById("write-card")
const title = document.getElementById("title-input")
const note = document.getElementById("note-input") 
const notesCont = document.querySelector(".notesContainer")
const filter = document.querySelector(".filters")
let counter = 0
let noNote = document.querySelector(".noNote")

function closeCard(){
   main.classList.remove("hide")
   writeCard.classList.remove("writeCard")

}

function writeNote(){
   main.classList.add("hide")
   writeCard.classList.add("writeCard")
} 

function addNote(){

   if(title.value == "" && note.value == ""){
      title.value = "write title here"
      note.value = "write note here"
      return
   }

   if(title.value == "" || title.value == "write title here"){
      title.value = "No title"
   }
   if(note.value == "" || note.value == "write note here"){
      note.value = "Empty note"
   }

   let notes = document.createElement("div")
   notes.className = "notes"
   notes.style.backgroundColor = getComputedStyle(title).backgroundColor
   notes.style.color = title.style.color 

   let headerNote = document.createElement("div")

   let titleValue = document.createElement("h3")
   titleValue.className = "title"
   titleValue.innerHTML = title.value

   let bin = document.createElement("img")
   bin.src = "bin.png"
   bin.className = "delete"
   bin.onclick = () => removeNote(notes)

   let noteValue = document.createElement("p")
   noteValue.className = "note"
   noteValue.innerHTML = note.value 

   let footerNote = document.createElement("div")
   footerNote.className = "bottom"
   
   let timeNote = document.createElement("p")
   timeNote.className = "time"
   let now = new Date()
   timeNote.innerHTML = now.toLocaleString()
   if(notes.style.color == 'black'){
      timeNote.style.color = 'white'
   }
   footerNote.appendChild(timeNote)

   let select = document.querySelector(".category")
   let selectedCategory = select.value  

   if(selectedCategory !== 'Categories'){
      let category = document.createElement("div")
      category.className = "categoryChoice"
 
      let categoryImg = document.createElement("img")
      categoryImg.src = `${selectedCategory.toLowerCase()}.png`  

      let categoryName = document.createElement("p")
      categoryName.className = "categName"
      categoryName.innerHTML = selectedCategory 

      category.appendChild(categoryImg)
      category.appendChild(categoryName)
      footerNote.appendChild(category)
   }

   headerNote.appendChild(titleValue)
   headerNote.appendChild(bin)
   notes.appendChild(headerNote)
   notes.appendChild(noteValue)
   notes.appendChild(footerNote)
   notesCont.appendChild(notes)

   main.classList.remove("hide")
   writeCard.classList.remove("writeCard")
   writeCard.classList.add("hide")
   title.value = ""
   note.value = ""
   select.value = "Categories"
   title.style.backgroundColor = "white"
   note.style.backgroundColor = "white"
   filter.value = "All"
   counter++
   noNote.classList.add("hide")
}

function removeNote(notes){
   notes.remove()
   counter > 0 ? counter-- : null

   if(counter == 0){
      noNote.classList.remove("hide")
   }
}

function changeColor(color){
   let colorChosen = document.querySelector(`.${color}`)
   let bg = getComputedStyle(colorChosen).backgroundColor
   title.style.backgroundColor = bg
   note.style.backgroundColor = bg
   if(color == 'blue' || color == 'purple' || color == 'red'){
      title.style.color = "white"
      note.style.color = "white"
   }
   else{
      title.style.color = "black"
      note.style.color = "black"
   }
}

filter.addEventListener("change", displayNotes)

function displayNotes() {
  const selectedFilter = filter.value;
  const notes = document.querySelectorAll(".notes")

  notes.forEach(notes => {
    const categoryEl = notes.querySelector(".categName")
    const category = categoryEl ? categoryEl.textContent : null
    if (selectedFilter === "All" || category === selectedFilter) {
      notes.style.display = "block"
    } else {
      notes.style.display = "none" 
    }
  }) 
} 
