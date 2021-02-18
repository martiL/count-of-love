
// Define all data related to the weeding here
function getData() {
  return {
    partnerA: 'Martin',
    partnerB: 'Dorle',
    weedingDay: new Date(2021, 2, 10),
    quote: 'I LOOK AT YOU, AND I’M HOME.',
    source: 'https://ohmy.disney.com/movies/2015/04/23/9-dory-quotes-deeper-than-the-drop-off/',
    local: "de-DE"
  }
}

// Main loop to render the timer
document.addEventListener('DOMContentLoaded', function() {
    const data = getData()

    const infoSection = document.querySelector('#info-container')
    const names = document.createElement('h2')
    names.innerHTML = `<h2>${data.partnerA} &#9829; ${data.partnerB}`
    infoSection.append(names)

    const timeDiff = getTimeDiff(Date.now(), data.weedingDay.getTime())
    if (timeDiff.days === 0) {
      const firstLine = document.createElement('p')
      firstLine.innerHTML = "Today is the day to celebrate our love."
      
      const yourQuote = document.createElement('blockquote')
      yourQuote.innerHTML = data.quote
      yourQuote.cite = data.source

      infoSection.append(firstLine)
      infoSection.append(yourQuote)
        
      infoSection.className = "info-section info-section-weedingday"

      const counterBox = document.querySelector('#counter-box')
      counterBox.className = "counter-container counter-container-weedingday"

    }
    createTimerStack(data.weedingDay)
    setInterval(function() {
        createTimerStack(data.weedingDay)
    }, 1000)

})

function createTimerStack(weedingDay) {
    const timeDiff = getTimeDiff(Date.now(), weedingDay.getTime())
    createCounterSection('years-container', timeDiff.years)
    createCounterSection('days-container', timeDiff.days)
    createCounterSection('hours-container', timeDiff.hours)
    createCounterSection('minutes-container', timeDiff.minutes)
    createCounterSection('seconds-container', timeDiff.seconds)
}

// function to create a counter elements for day, min and sec
function createCounterSection(sectionId, time) {
    if (time < 1) {
        return
    }
    const sectionContainer = document.querySelector(`#${sectionId}`)
    const oldContent = document.querySelector(`#${sectionId}-content`)

    const contentContainer = document.createElement('div')
    contentContainer.id = `${sectionId}-content`

    sectionContainer.replaceChild(contentContainer, oldContent)

    const timeTag = document.createElement('h3')
    let imageSize = "24px";

    switch (sectionId) {
        case 'years-container':
            timeTag.innerHTML = time > 1 ? `${time} years` :  `${time} year`;
            imageSize = "36px"
            break;
        case 'seconds-container':
            timeTag.innerHTML = time > 1 ? `${time} seconds` :  `${time} second`;
            imageSize = "12px"
            break;
        case 'minutes-container':
            timeTag.innerHTML =  time > 1 ? `${time} minutes` : `${time} minute`;
            imageSize = "14px"
            break;
        case 'days-container':
            timeTag.innerHTML =  time > 1 ? `${time} days` : `${time} day`;
            imageSize = "24px"
            break;
        case 'hours-container':
            timeTag.innerHTML =  time > 1 ? `${time} hours` : `${time} hour`; 
            imageSize = "16px"
            break;
        default:
            break;
    }
    contentContainer.append(timeTag)

    const heartContainer = document.createElement('div')
    heartContainer.className = 'heart-container'
    for(let i = 0; i < time; i++) {
        const heart = document.createElement('img')
        heart.src = 'heart.svg'
        heart.style.width = imageSize
        heart.style.height = imageSize
        heartContainer.append(heart)
    }
    contentContainer.append(heartContainer)
}

// credits to https://stackoverflow.com/a/13904120
function getTimeDiff(now, future) {
    // get total seconds between the times
    var delta = Math.abs(future - now) / 1000;

    // calculate (and subtract) whole years
    var years = Math.floor(delta/31557600);
    delta -= years * 31557600;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.floor(delta % 60)


    return {
      years: years,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
}