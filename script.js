
let ModalClose = () => {
  document.querySelector('.modal__back').classList.add('item--hidden')
}

let ModalOpen = () => {
  document.querySelector('.modal__back').classList.remove('item--hidden')
}

document.querySelector('.modal__close').addEventListener('click', () => {
  document.querySelector('.modal__inner').style.top = "auto"
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
      item.volume = 0.1
      item.play()
    } else {
      item.classList.add('modal__video--disable')
      item.volume = 0.1
      item.pause()
    }
  })
}

source.map((value, index) => {
  if (index === count) {
    document.querySelector('.modal__inner').innerHTML +=
      ` <div class="modal__video-box">
    <video class="modal__video" index="${index}" loop>
      <source src="${value}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' >
      
    </video>
    <div class="modal__video-btns">
      <button class="modal__video-btn--sound" index="${index}">
        <img class="modal__video-btn--img-sound" src="./image/sound.svg" alt="" srcset="">
        <img class="modal__video-btn--img-sound-black" src="./image/sound-black.svg" alt="" srcset="">
      </button>
      <button class="modal__video-btn--like">
        <img class="modal__video-btn--img" src="./image/Like.svg" alt="" srcset="">
      </button>
      <button class="modal__video-btn--dislike">
        <img class="modal__video-btn--img" src="./image/Dislike.svg" alt="" srcset="">
      </button>
      <button class="modal__video-btn--share">
        <img class="modal__video-btn--img" src="./image/share.svg" alt="" srcset="">
      </button>
      </div>
  </div> `
  } else {
    document.querySelector('.modal__inner').innerHTML +=
      ` <div class="modal__video-box">
        <video class="modal__video modal__video--disable" index="${index}" loop>
          <source src="${value}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' >
        </video>
        <div class="modal__video-btns">
            <button class="modal__video-btn--sound" index="${index}">
              <img class="modal__video-btn--img-sound" src="./image/sound.svg" alt="" srcset="">
              <img class="modal__video-btn--img-sound-black" src="./image/sound-black.svg" alt="" srcset="">
            </button>
            <button class="modal__video-btn--like">
              <img class="modal__video-btn--img" src="./image/Like.svg" alt="" srcset="">
            </button>
            <button class="modal__video-btn--dislike">
              <img class="modal__video-btn--img" src="./image/Dislike.svg" alt="" srcset="">
            </button>
            <button class="modal__video-btn--share">
              <img class="modal__video-btn--img" src="./image/share.svg" alt="" srcset="">
            </button>
          </div>
      </div> `
  }
})

let height = document.querySelector('.modal__inner').offsetHeight

let step = height / maxVideo

let px = 0

let disable 

let paused

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

    disable,paused = false

    document.querySelectorAll('.modal__video-btn--sound').forEach(button => {
      button.classList.remove('modal__video-btn--disable')
    })
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

    disable,paused = false

    document.querySelectorAll('.modal__video-btn--sound').forEach(button => {
      button.classList.remove('modal__video-btn--disable')
    })
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
        disable,paused = false
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
      if (yDiff < 0) {
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


document.querySelectorAll('.modal__video-btn--sound').forEach(button => {
  
  button.addEventListener('click', () => {
    console.log('ds');
    document.querySelectorAll('.modal__video').forEach(video => {
      if (video.getAttribute('index') == button.getAttribute('index')) {
        if (disable === false) {
          video.volume = 0
          disable = true
          console.log('start');
          button.classList.add('modal__video-btn--disable')
        } else {
          video.volume = 0.1
          disable = false
          console.log('stop');
          button.classList.remove('modal__video-btn--disable')

        }
      } 
    })
  })
})

document.querySelectorAll('.modal__video').forEach(item => {
  item.addEventListener('click', () => {
    if (paused === false) {
      item.pause()
      paused = true
    } else {
      item.play()
      paused = false
      item.classList.remove('modal__video--stoped')
    }
  })
})