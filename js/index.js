document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        smoothScroll(targetElement)
      }
    })
  })

  function smoothScroll(targetElement) {
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY
    const startTime = performance.now()

    function animateScroll(currentTime) {
      const elapsedTime = currentTime - startTime
      const scrollPosition = easeInOutQuad(
        elapsedTime,
        startPosition,
        targetPosition - startPosition,
        duration
      )
      window.scroll(0, scrollPosition)
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    const startPosition = window.scrollY
    const duration = 1000

    requestAnimationFrame(animateScroll)
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }
})
