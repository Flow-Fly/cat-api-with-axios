// const {data} = await axios.get('http://localhost:5005/cats')
// console.log(data)
const baseUrl = "http://localhost:5005/cats"
const getCatsButton = qs("#get-cats")
const catTemplate = qs("#cat-template")
const catContainer = qs(".cat.container")
const createCatButton = qs("#create-cat")
const form = qs("form")
const submitButton = qs("#submit")
const nameInput = qs("input#name", form)
const urlInput = qs("input#url", form)
const errorMessage = qs(".error", form)

getCatsButton.addEventListener("click", getCats)
createCatButton.addEventListener("click", displayForm)
submitButton.addEventListener("click", handleSubmit)
form.addEventListener("keydown", () => (errorMessage.textContent = ""))
// nameInput.addEventListener('keydown', () => errorMessage.textContent = '')
// urlInput.addEventListener('keydown', () => errorMessage.textContent = '')

async function getCats() {
	catContainer.innerHTML = null
	// catContainer.replaceNode()
	const { data } = await axios.get(baseUrl)
	data.forEach((cat) => {
		// console.log(cat)
		createTemplateAndAppend(cat)
	})
}

async function handleSubmit(e) {
	e.preventDefault()
	const cat = {
		name: nameInput.value,
		url: urlInput.value,
	}
	if (cat.name === "" || cat.url === "") {
		errorMessage.textContent = "Please provide some values !"
		return
	}
	if (e.target.textContent.includes("Create")) {
		const { data } = await axios.post(baseUrl, cat)
		// console.log(data)
		createTemplateAndAppend(data)
	} else {
		const id = e.target.dataset.id
		await axios.patch(`${baseUrl}/${id}`, cat)
		getCats()
		e.target.textContent = "Create 😼"
	}
	hideForm()
}

function createTemplateAndAppend(cat) {
	const clone = catTemplate.content.cloneNode(true)
	qs("h3", clone).textContent = cat.name
	qs("img", clone).src = cat.url
	qs(".card", clone).dataset.id = cat._id
	qs(".edit", clone).addEventListener("click", editCat)
	qs(".delete", clone).addEventListener("click", deleteCat)
	catContainer.append(clone)
}

function editCat(e) {
	displayForm()
	const card = e.target.closest(".card")
	const { id } = card.dataset
	nameInput.value = qs("h3", card).textContent
	urlInput.value = qs("img", card).src
	submitButton.textContent = "Edit 😼"
	submitButton.dataset.id = id
}

async function deleteCat(e) {
	const id = e.target.closest(".card").dataset.id
	// console.log(id)
	await axios.delete(`${baseUrl}/${id}`)
	e.target.closest(".card").remove()
}

function displayForm() {
	resetForm()
	form.classList.remove("hidden")
}

function resetForm() {
	qs("input#name", form).value = ""
	qs("input#url", form).value = ""
}
function hideForm() {
	resetForm()
	form.classList.add("hidden")
}

function qs(selector, element = document) {
	return element.querySelector(selector)
}
function qsa(selector, element = document) {
	return [...element.querySelectorAll(selector)]
}
