const url = "https://send.pageclip.co/7A5E2mxhjVipBMIYPlmA2RmtGkLWEGvZ/email-form"
const nav = document.getElementsByTagName("nav")[0]
const heroImg = document.getElementsByClassName("img-container")[0]

function post(url, data) {
	let xhr

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP")
	}

	xhr.open('POST', url, true)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader("Accept", "applicatison/json")
	xhr.send(JSON.stringify(data))

	localStorage.setItem("prepme-formsubmitted", new Date().toString())
}

function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

Array.from(document.getElementsByClassName("email-form")).map(el => {
	const emailInput = el.children[0]
	const button = el.children[1]

	button.addEventListener("click", () => {
		const submitted = localStorage.getItem("prepme-formsubmitted")
		const email = emailInput.value

		if ((new Date(submitted) == null) || (new Date() - new Date(submitted) < 1000*60*60*24) || (!validateEmail(email))) {
			emailInput.classList.add("invalid")

			emailInput.animate(
				[
					{ transform: 'translateX(0px)'},
					{ transform: 'translateX(-5px)'},
					{ transform: 'translateX(0px)'},
					{ transform: 'translateX(5px)'},
					{ transform: 'translateX(0px)'},
				], {
					duration: 100,
					iterations: 2
				}
			)

			const listener = () => {
				emailInput.classList.remove("invalid")
				emailInput.removeEventListener("change", listener)
			}
			emailInput.addEventListener("change", listener)
			return
		}

		emailInput.value = "Added to waitlist"
		emailInput.setAttribute("disabled", true)
		button.setAttribute("disabled", true)

		const data = {email: email}
		post(url, data)

		setTimeout(hideModal, 1000);
	})
})

document.addEventListener("scroll", (e) => {
	// Nav
	if (window.scrollY <= 20) {
		nav.classList.remove("scroll")
	} else {
		nav.classList.add("scroll")
	}

	// Hero Page Cluster
	let imgStyle = ""

	const MAX_SCALE = 1.15
	const MAX_OFFSET = 75

	imgStyle += `--scale: ${Math.min(MAX_SCALE, 1+(MAX_SCALE-1)*(window.scrollY/400))};`

	imgStyle += `--offset: ${Math.max(MAX_OFFSET, 150-(MAX_OFFSET)*(window.scrollY/400))}px;`

	heroImg.setAttribute("style", imgStyle)
})

for (const arrowButton of document.getElementsByClassName("arrow")) {
	arrowButton.addEventListener("click", () => {
		document.getElementById("flipper").classList.toggle("flipped")
	})
}

function showModal() {
	const modal = document.getElementsByTagName("modal")[0]
	const background = document.getElementById("modal-background")
	modal.classList.remove("hidden")
	background.classList.remove("hidden")

	background.addEventListener("click", hideModal)
}

function hideModal() {
	const modal = document.getElementsByTagName("modal")[0]
	const background = document.getElementById("modal-background")
	modal.classList.add("hidden")
	background.classList.add("hidden")
}

// Observer constants
const thresholds = []
for (let i = 0; i <= 1; i += 0.1) {
	thresholds.push(i)
}

// Add fade-in observer
const fadeIn = document.getElementsByClassName("fade-in")
const fadeObserverCallback = function(entries) {
	entries.forEach(entry => {
		console.log(entry.intersectionRatio)
		if (entry.intersectionRatio > 0.8) {
			entry.target.classList.add('faded-in')
		} else if (entry.intersectionRatio < 0.4) {
			entry.target.classList.remove('faded-in')
		}
	})
}

const fadeObserver = new IntersectionObserver(fadeObserverCallback, {"threshold": thresholds})

for (const el of fadeIn) {
	fadeObserver.observe(el)
}

// Add slide-fade-in observer
const slideFadeIn = document.getElementsByClassName("slide-fade-in")
const slideFadeObserverCallback = function(entries) {
	entries.forEach(entry => {
		console.log(entry.intersectionRatio)
		if (entry.intersectionRatio > 0.3) {
			entry.target.classList.add('slided-faded-in')
		} else if (entry.intersectionRatio < 0.3) {
			entry.target.classList.remove('slided-faded-in')
		}
	})
}

const slideFadeObserver = new IntersectionObserver(slideFadeObserverCallback, {"threshold": thresholds})

for (const el of slideFadeIn) {
	slideFadeObserver.observe(el)
}

// Prevent Modal Flash
window.requestAnimationFrame(() => {
	document.body.classList.remove("no-transition")
})
