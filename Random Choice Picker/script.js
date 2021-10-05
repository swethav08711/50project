//to get whenb te4xt is added to text area
// make the text init amn array
//every element of array in to span

const textarea = document.getElementById("textarea")
const tagsEl = document.getElementById("tags")
textarea.addEventListener("keyup", event => {
  createtags(event.target.value)
  if (event.key === "Enter") {
    setTimeout(() => {
      event.target.value = ""
    }, 10)
    randomSelect()
  }
})
function createtags(input) {
  const tags = input
    .split(",")
    .filter(tag => tag.trim() !== "")
    .map(tag => tag.trim())
  console.log(tags)
  tagsEl.innerHTML = null
  tags.forEach(tag => {
    const t = document.createElement("span")
    t.classList.add("tag")
    t.innerText = tag
    tagsEl.append(t)
  })
}

function randomSelect() {
  const times = 30
  const int = 100
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()
    //hoghlight atgs
    highlightTag(randomTag)
    //unhighlight
    setTimeout(() => {
      unhighlightTag(randomTag)
    }, int)
  }, int)
  setTimeout(() => {
    clearInterval(interval)
    setTimeout(() => {
      const randomTag = pickRandomTag()
      //hoghlight atgs
      highlightTag(randomTag)
    }, int)
  }, int * times)
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag")
  return tags[Math.floor(Math.random() * tags.length)]
}
function highlightTag(tag) {
  tag.classList.add("highlight")
}
function unhighlightTag(tag) {
  tag.classList.remove("highlight")
}
//know when the enter is pressed we a random select
