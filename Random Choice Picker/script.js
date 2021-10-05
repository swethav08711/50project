//to get whenb te4xt is added to text area
// make the text init amn array
//every element of array in to span

const textarea = document.getElementById("textarea")
const tagsEl = document.getElementById("tags")
textarea.addEventListener("keyup", event => {
  createtags(event.target.value)
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
