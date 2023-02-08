const url = "https://send.pageclip.co/7A5E2mxhjVipBMIYPlmA2RmtGkLWEGvZ/email-form"

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

document.getElementById("hero-button").addEventListener("click", () => {
	const emailInput = document.getElementById("hero-email")
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

	emailInput.value = "Thank You!"
	emailInput.setAttribute("disabled", true)
	document.getElementById("hero-button").setAttribute("disabled", true)

	const data = {email: email}
	post(url, data)
})
