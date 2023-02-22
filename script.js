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
	xhr.setRequestHeader("Accept", "application/json")
	xhr.send(JSON.stringify(data))
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
		const email = emailInput.value

		if (!validateEmail(email)) {
			emailInput.classList.add("invalid")
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
	modal.classList.remove("hidden")
}

function hideModal() {
	const modal = document.getElementsByTagName("modal")[0]
	modal.classList.add("hidden")
}

document.body.classList.remove("no-transition")
