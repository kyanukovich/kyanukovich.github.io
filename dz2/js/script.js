'use strict';

(function () {
  const originalPositions = []
  const daElements = document.querySelectorAll('[data-da]')
  const daElementsArray = []
  const daMatchMedia = [] 

  if (daElements.length > 0) {
    let number = 0

    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index]
      const daMove = daElement.getAttribute('data-da')

      if (daMove != '') {
        const daArray = daMove.split(',')
        const daPlace = daArray[1] ? daArray[1].trim() : 'last'
        const daBreakpoint = daArray[2] ? daArray[2].trim() : '767'
        const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max'
        const daDestination = document.querySelector('.' + daArray[0].trim())

        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number)
          originalPositions[number] = {
            parent: daElement.parentNode,
            index: indexInParent(daElement)
          }
          daElementsArray[number] = {
            element: daElement,
            destination: document.querySelector('.' + daArray[0].trim()),
            place: daPlace,
            breakpoint: daBreakpoint,
            type: daType
          }
          number++
        }
      }
    }

    dynamicAdaptSort(daElementsArray)
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index]
      const daBreakpoint = el.breakpoint
      const daType = el.type
      daMatchMedia.push(
        window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)')
      )
      daMatchMedia[index].addListener(dynamicAdapt)
    }
  }
  function dynamicAdapt (e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index]
      const daElement = el.element
      const daDestination = el.destination
      const daPlace = el.place
      const daBreakpoint = el.breakpoint
      const daClassname = '_dynamic_adapt_' + daBreakpoint

      if (daMatchMedia[index].matches) {
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace]

          if (daPlace === 'first') {
            actualIndex = indexOfElements(daDestination)[0]
          } else if (daPlace === 'last') {
            actualIndex = indexOfElements(daDestination)[
              indexOfElements(daDestination).length
            ]
          }

          daDestination.insertBefore(
            daElement,
            daDestination.children[actualIndex]
          )
          daElement.classList.add(daClassname)
        }
      } else {
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement)
          daElement.classList.remove(daClassname)
        }
      }
    }

    customAdapt()
  }
  dynamicAdapt()
  function dynamicAdaptBack (el) {
    const daIndex = el.getAttribute('data-da-index')
    const originalPlace = originalPositions[daIndex]
    const parentPlace = originalPlace.parent
    const indexPlace = originalPlace.index
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace]
    parentPlace.insertBefore(el, parentPlace.children[actualIndex])
  }
  function indexInParent (el) {
    const children = Array.prototype.slice.call(el.parentNode.children)
    return children.indexOf(el)
  }
  function indexOfElements (parent, back) {
    const children = parent.children
    const childrenArray = []

    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i]

      if (back) {
        childrenArray.push(i)
      } else {
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i)
        }
      }
    }

    return childrenArray
  }
  function dynamicAdaptSort (arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1
      } else {
        return 1
      }
    })
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1
      } else {
        return -1
      }
    })
  }
  function customAdapt () {
    // const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
})()

const user_icon = document.querySelector('.icon-menu')
user_icon.addEventListener('click', function (e) {
  const user_menu = document.querySelector('.menu__body')
  user_menu.classList.toggle('_active')
  user_icon.classList.toggle('_active')
})
document.addEventListener('click', function (e) {
  if (!e.target.closest('.header')) {
    const user_menu = document.querySelector('.menu__body')
    const user_icon = document.querySelector('.icon-menu')
    user_menu.classList.remove('_active')
    user_icon.classList.remove('_active')
  }
})
document.addEventListener('click', function (e) {
  if (e.target.closest('.menu__close')) {
    const user_menu = document.querySelector('.menu__body')
    const user_icon = document.querySelector('.icon-menu')
    user_menu.classList.remove('_active')
    user_icon.classList.remove('_active')
  }
})
const anchors = document.querySelectorAll('a[href*="#"]')

for (const anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

var swiper = new Swiper('.swiper-container');
