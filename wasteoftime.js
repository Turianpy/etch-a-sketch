// hiding overflow for animation duration //
document.querySelector('body').style.overflow = 'hidden'

const myName = document.querySelector('.me')
const ghLogo = document.getElementById('github-logo')

function breakApart(myName) {
    const myNameSplit = myName.textContent.split('')
    myName.textContent = ''
    for (let i = 0; i < myNameSplit.length; i++) {
        letter = document.createElement('span')
        letter.setAttribute('id', `l${i}`)
        letter.textContent = myNameSplit[i]
        if (i == 0) {
            letter.classList.add('last')
        }
        myName.appendChild(letter)
    }
}

function animate(elem) {
    elem.classList.add('animate')
}

function goBack(elem) {
    elem.classList.remove('animate')
    elem.classList.add('go-back')
}

breakApart(myName)

ghLogo.addEventListener('animationend', (e) => {
    animate(myName)
})

window.addEventListener('load', () => {
    animate(ghLogo)
})

const lastLetter = document.querySelector('.last')

lastLetter.addEventListener('animationend', (e) => {
    goBack(ghLogo)
    const newGh = document.querySelector('.go-back')
    newGh.addEventListener('animationend', (e) => {
        goBack(myName)
        const lastAnimation = myName.childNodes[6]
        lastAnimation.addEventListener('animationend', (e) => {
            document.querySelector('body').style.overflow = 'visible'
        })
    })
})
