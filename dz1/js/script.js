$(document).ready(function () {
  $('.navbar__burger').click(function (event) {
    $('.menu, .navbar__burger').toggleClass('open')
    $('body').toggleClass('lock')
  })
});

('use strict')
const multiItemSlider_2 = (function () {
  return function (selector, config) {
    const _mainElement = document.querySelector(selector)
    const _sliderWrapper_2 = _mainElement.querySelector('.slider__wrapper_2')
    const _sliderItems_2 = _mainElement.querySelectorAll('.slider__item_2')
    const _sliderControls_2 = _mainElement.querySelectorAll(
      '.slider__control_2'
    )
    const _sliderControlLeft_2 = _mainElement.querySelector(
      '.slider__control_left_2'
    )
    const _sliderControlRight_2 = _mainElement.querySelector(
      '.slider__control_right_2'
    )
    const _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper_2).width)
    const _itemWidth = parseFloat(getComputedStyle(_sliderItems_2[0]).width)
    let _positionLeftItem = 0
    let _transform = 0
    const _step = (_itemWidth / _wrapperWidth) * 100
    const _items = []
    _sliderItems_2.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 })
    })

    const position = {
      getMin: 0,
      getMax: _items.length - 1
    }

    const _transformItem = function (direction) {
      if (direction === 'right') {
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >=
          position.getMax
        ) {
          return
        }
        if (
          !_sliderControlLeft_2.classList.contains('slider__control_show_2')
        ) {
          _sliderControlLeft_2.classList.add('slider__control_show_2')
        }
        if (
          _sliderControlRight_2.classList.contains('slider__control_show_2') &&
          _positionLeftItem + _wrapperWidth / _itemWidth >= position.getMax
        ) {
          _sliderControlRight_2.classList.remove('slider__control_show_2')
        }
        _positionLeftItem++
        _transform -= _step
      }
      if (direction === 'left') {
        if (_positionLeftItem <= position.getMin) {
          return
        }
        if (
          !_sliderControlRight_2.classList.contains('slider__control_show_2')
        ) {
          _sliderControlRight_2.classList.add('slider__control_show_2')
        }
        if (
          _sliderControlLeft_2.classList.contains('slider__control_show_2') &&
          _positionLeftItem - 1 <= position.getMin
        ) {
          _sliderControlLeft_2.classList.remove('slider__control_show_2')
        }
        _positionLeftItem--
        _transform += _step
      }
      _sliderWrapper_2.style.transform = 'translateX(' + _transform + '%)'
    }

    const _controlClick = function (e) {
      if (e.target.classList.contains('slider__control_2')) {
        e.preventDefault()
        const direction = e.target.classList.contains('slider__control_right_2')
          ? 'right'
          : 'left'
        _transformItem(direction)
      }
    }

    const _setUpListeners = function () {
      _sliderControls_2.forEach(function (item) {
        item.addEventListener('click', _controlClick)
      })
    }

    _setUpListeners()

    return {
      right: function () {
        _transformItem('right')
      },
      left: function () {
        _transformItem('left')
      }
    }
  }
})()

const slider = multiItemSlider_2('.slider_2')
