// Run open resource function when elements with data-action set to openResource
function openResource() {
	document.getElementById("bruh").classList.remove("hidden")
}

document.querySelectorAll("[data-action='openResource']").forEach(x => {
	x.addEventListener("click", openResource)
})

// Process URL parameters
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

if (urlParams.has("rootsize")) {
	document.documentElement.style.setProperty('--root-font-size', `${urlParams.get("rootsize")}px`)
} else if (navigator.userAgent.includes("Mobile")) {
	document.documentElement.style.setProperty('--root-font-size', `1px`)
} else {
	document.documentElement.style.setProperty('--root-font-size', `0.8px`)
}

if (urlParams.has("fullScreen")) {
	document.addEventListener("click", () => {
		document.documentElement.webkitRequestFullscreen()
	})

	document.getElementsByTagName("nav")[0].setAttribute("style", "padding-top: 110rem; height: calc(100% - 120rem);")
}

// Page transitions
function fadeOut(page, callback) {
	const things = page.children

	for (let i = 1; i <= things.length; i++) {
		const thing = things[things.length-i]

		setTimeout(() => {
			thing.classList.add("faded-out")
		}, (i-1)*100)
	}

	setTimeout(() => {
		page.classList.add("hidden")
		for (const thing of things) {
			thing.classList.remove("faded-out")
		}

		callback()
	}, things.length*100)
}

function fadeIn(page) {
	const things = page.children

	for (const thing of things) {
		thing.classList.add("no-trans")
		thing.classList.add("faded-out")
		thing.classList.remove("no-trans")
	}

	page.classList.remove("hidden")

	for (let i = 1; i <= things.length; i++) {
		const thing = things[i-1]

		setTimeout(() => {
			thing.classList.remove("faded-out")
		}, i*100)
	}
}

// Nav and pagination
const navPages = Array.from(document.getElementsByClassName("nav-page"))
const pages = Array.from(document.getElementsByTagName("page"))

function clearNav() {
	for (const navPage of navPages) {
		navPage.classList.remove("active")
	}
}

function findCurrentPage() {
	for (const page of pages) {
		if (!page.classList.contains("hidden")) {
			return page
		}
	}
}

function navClick(index) {
	const navPage = navPages[index]
	const page = pages[index]

	return (e) => {
		const currentPage = findCurrentPage()

		if (currentPage == page) return

		clearNav()

		navPage.classList.add("active")
		fadeOut(currentPage, () => {
			fadeIn(page)
		})
	}
}

for (let i = 0; i < pages.length; i++) {
	navPages[i].addEventListener("click", navClick(i))
}

document.getElementById("bruh").addEventListener("click", () => {
	document.getElementById("bruh").classList.add("hidden")
})

// Update and animate progress bars
let testingDone = 0
let totalTesting = 0

let essaysDone = 0
let totalEssays = 0

function updateBars() {
	// Overall dash bar
	Array.from(document.getElementsByClassName("overall-bar")).forEach(x => {
		x.setAttribute("style", `--lb-right: 72%; --db-right: ${100*(testingDone+essaysDone)/(totalTesting+totalEssays)}%;`)

		Array.from(x.getElementsByClassName("label")).forEach(x => {
			x.innerText = Math.round(100*(testingDone+essaysDone)/(totalTesting+totalEssays))+"%"
		})
	})

	// Testing bars
	Array.from(document.getElementsByClassName("testing-bar")).forEach(x => {
		x.setAttribute("style", `--lb-right: 60%; --db-right: ${100*testingDone/totalTesting}%;`)

		Array.from(x.getElementsByClassName("label")).forEach(x => {
			x.innerText = Math.round(100*testingDone/totalTesting)+"%"
		})
	})

	// Essays and forms bars
	Array.from(document.getElementsByClassName("essay-bar")).forEach(x => {
		x.setAttribute("style", `--lb-right: 80%; --db-right: ${100*essaysDone/totalEssays}%;`)

		Array.from(x.getElementsByClassName("label")).forEach(x => {
			x.innerText = Math.round(100*essaysDone/totalEssays)+"%"
		})
	})
}

// Update the bars when input checkboxes marked with the data type are updated

// Testing checkboxes
document.querySelectorAll("[data-type='testing']").forEach(x => {
	totalTesting += 1

	if (x.getAttribute("data-checked") == "yes") {
		testingDone += 1
	}

	x.addEventListener("click", () => {
		if (x.getAttribute("data-checked") == "yes") {
			testingDone -= 1
			x.setAttribute("data-checked", "no")
		} else {
			testingDone += 1
			x.setAttribute("data-checked", "yes")
		}

		updateBars()
	})
})

// Essay checkboxes
document.querySelectorAll("[data-type='essays']").forEach(x => {
	totalEssays += 1
	
	if (x.getAttribute("data-checked") == "yes") {
		essaysDone += 1
	}

	x.addEventListener("click", () => {
		if (x.getAttribute("data-checked") == "yes") {
			essaysDone -= 1
			x.setAttribute("data-checked", "no")
		} else {
			essaysDone += 1
			x.setAttribute("data-checked", "yes")
		}

		updateBars()
	})
})

// "Toggle All" functionality for task groups
// Toggle all for testing
document.querySelectorAll("[data-action='toggleAllTesting']").forEach(x => {
	x.addEventListener("click", () => {
		if (testingDone == totalTesting) {
			document.querySelectorAll("[data-type='testing']").forEach(x => x.click())
		} else {
			document.querySelectorAll("[data-type='testing']").forEach(x => {
				if (x.getAttribute("data-checked") == "no") {
					x.click()
				}
			})
		}
	})
})

// Toggle all for essays
document.querySelectorAll("[data-action='toggleAllEssays']").forEach(x => {
	x.addEventListener("click", () => {
		if (essaysDone == totalEssays) {
			document.querySelectorAll("[data-type='essays']").forEach(x => x.click())
		} else {
			document.querySelectorAll("[data-type='essays']").forEach(x => {
				if (x.getAttribute("data-checked") == "no") {
					x.click()
				}
			})
		}
	})
})

// Update progress bars on load
updateBars()
