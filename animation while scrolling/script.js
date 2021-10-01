const box = document.querySelectorAll(".box")

window.addEventListener("scroll", scrolling)

function scrolling() {
  const triggerBottom = window.innerHeight * (4 / 5)
  box.forEach((box) => {
    const boxtop = box.getBoundingClientRect().top
    if (triggerBottom > boxtop) {
      box.classList.add("show")
    } else {
      box.classList.remove("show")
    }
  })
}
