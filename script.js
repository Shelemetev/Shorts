
let ModalClose = () => {
  document.querySelector('.modal__back').classList.add('item--hidden')
}

let ModalOpen = () => {
  document.querySelector('.modal__back').classList.remove('item--hidden')
}

document.querySelector('.modal__close').addEventListener('click', () => {
  ModalClose()
  document.querySelectorAll('.modal__video').forEach(item => {
    item.pause()
  })
})

let source = []
let maxVideo = 0

const videoButtons = document.querySelectorAll('.main__item')

videoButtons.forEach(item => {
  source[item.getAttribute('number')] = item.getAttribute('video')
})

maxVideo = source.length

let count = 0

let play = () => {
  document.querySelectorAll('.modal__video').forEach(item => {
    if (parseInt(item.getAttribute('index')) === count) {
      item.classList.remove('modal__video--disable');
      item.currentTime = 0
      item.play()
      console.log(item);
    } else {
      item.classList.add('modal__video--disable')
      item.pause()
    }
  })
}

source.map((value, index) => {
  if (index === count) {
    document.querySelector('.modal__inner').innerHTML +=
      `<video class="modal__video"  index="${index}" loop>
        <source src="${value}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' >
        <div class="modal__video-btns">
          <button class="modal__video-btn--sound">sdsdsd</button>
          <button class="modal__video-btn--lile">ssdsd</button>
          <button class="modal__video-btn--dislike">sdsds</button>
          <button class="modal__video-btn--share">sds</button>
        </div>
      </video>`
  } else {
    document.querySelector('.modal__inner').innerHTML +=
      `<video class="modal__video modal__video--disable"  index="${index}" loop>
        <source src="${value}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' >
        <div class="modal__video-btns">
        <button class="modal__video-btn--sound">sdsdsd</button>
        <button class="modal__video-btn--lile">ssdsd</button>
        <button class="modal__video-btn--dislike">sdsds</button>
        <button class="modal__video-btn--share">sds</button>
        </div>
      </video>`
  }
})

let height = document.querySelector('.modal__inner').offsetHeight

let step = height / maxVideo

let px = 0

window.addEventListener('wheel', (event) => {

  if (event.deltaY > 0) {
    px += 50
    document.querySelector('.modal__inner').style.top = `-${step * count + px}px`
  } else {
    px -= 50
    document.querySelector('.modal__inner').style.top = `${-(step * count) - px}px`
  }

  if (px > 100) {
    // if(event.deltaY > 0) {
    //   count++
    // } else {
    //   count--
    // }

    count++

    if (count < 0) {
      count = 0
    } else if (count >= maxVideo) {
      count = maxVideo - 1
    }

    document.querySelector('.modal__inner').style.top = `${step * -count}px`
    px = 0

    play()

  }


  if (px < -100) {
    // if(event.deltaY > 0) {
    //   count++
    // } else {
    //   count--
    // }

    count--

    if (count < 0) {
      count = 0
    } else if (count >= maxVideo) {
      count = maxVideo - 1
    }

    document.querySelector('.modal__inner').style.top = `${step * -count}px`
    px = 0

    play()

  }


})

document.querySelectorAll('.main__item').forEach(item => {
  item.addEventListener('click', () => {
    // console.log(parseInt(item.getAttribute('number')) + 1);
    ModalOpen()
    count = parseInt(item.getAttribute('number'))
    console.log(count);

    document.querySelector('.modal__inner').style.top = `-${step * count}px`

    document.querySelectorAll('.modal__video').forEach(video => {
      video.classList.add("modal__video--disable")
      console.log(item.getAttribute('number'), video.getAttribute('index'));
      if (item.getAttribute('number') == video.getAttribute('index')) {
        video.classList.remove("modal__video--disable")
        play()
      }
    })

  })

 
})

{
  document.querySelector('.modal__inner').addEventListener("touchstart", Start, false)
  document.querySelector('.modal__inner').addEventListener("touchmove", Move, false)

  let x1 = null
  let y1 = null

  function Start(event) {
    const firstTouch = event.touches[0]

    x1 = firstTouch.clientX

    y1 = firstTouch.clientY

  }

  function Move(event) {
    if (!x1 || !y1) {
      return false
    }
    let x2 = event.touches[0].clientX

    let y2 = event.touches[0].clientY

    let xDiff = x2 - x1

    let yDiff = y2 - y1


    if (Math.abs(yDiff) > Math.abs(xDiff) && (yDiff >= 10 || yDiff <= -10)) {
      if (yDiff < 0 ) {
        px -= 100
        document.querySelector('.modal__inner').style.top = `${-(step * count) - px}px`
        if (px = -100) {
          // if(event.deltaY > 0) {
          //   count++
          // } else {
          //   count--
          // }
      
          count--
      
          if (count < 0) {
            count = 0
          } else if (count >= maxVideo) {
            count = maxVideo - 1
          }
      
          document.querySelector('.modal__inner').style.top = `${step * -count}px`
          px = 0
      
          play()
      
        }
      } else {
        px += 100
        document.querySelector('.modal__inner').style.top = `-${step * count + px}px`
        if (px = 100) {
          // if(event.deltaY > 0) {
          //   count++
          // } else {
          //   count--
          // }
      
          count++
      
          if (count < 0) {
            count = 0
          } else if (count >= maxVideo) {
            count = maxVideo - 1
          }
      
          document.querySelector('.modal__inner').style.top = `${step * -count}px`
          px = 0
      
          play()
      
        }
      }
    }
    x1 = null
    y1 = null

  }
}