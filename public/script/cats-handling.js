import { qs } from "./utils.js"
const baseUrl = "http://localhost:5005/cats"

export const form = qs("form"),
	catTemplate = qs("#cat-template"),
	catContainer = qs(".cat.container"),
	getCatsButton = qs("#get-cats"),
	createCatButton = qs("#create-cat"),
	submitButton = qs("#submit"),
	urlInput = qs("input#url", form),
	nameInput = qs("input#name", form),
	errorMessage = qs(".error", form)

export async function getCats() {
	catContainer.innerHTML = null
	// catContainer.replaceNode()
	const { data } = await axios.get(baseUrl)
	data.forEach((cat) => {
		// console.log(cat)
		createTemplateAndAppend(cat)
	})
}

export async function handleSubmit(e) {
	e.preventDefault()
	// const cat = {
	// 	name: nameInput.value,
	// 	url: urlInput.value,
	// }
	const fd = new FormData()
	// console.log(urlInput)
	if (nameInput.value === "") {
		errorMessage.textContent = "Please provide some values !"
		return
	}
	fd.append("name", nameInput.value)

	fd.append("url", urlInput.files[0])

	if (e.target.textContent.includes("Create")) {
		const { data } = await axios.post(baseUrl, fd)
		// console.log(data)
		createTemplateAndAppend(data)
	} else {
		const id = e.target.dataset.id
		await axios.patch(`${baseUrl}/${id}`, fd)
		getCats()
		e.target.textContent = "Create 😼"
	}
	hideForm()
}

export function createTemplateAndAppend(cat) {
	const clone = catTemplate.content.cloneNode(true)
	qs("h3", clone).textContent = cat.name
	qs("img", clone).src = cat.url
	qs(".card", clone).dataset.id = cat._id
	qs(".edit", clone).addEventListener("click", editCat)
	qs(".delete", clone).addEventListener("click", deleteCat)
	catContainer.append(clone)
}

export function editCat(e) {
	displayForm()
	const card = e.target.closest(".card")
	const { id } = card.dataset
	nameInput.value = qs("h3", card).textContent
	urlInput.value = qs("img", card).src
	submitButton.textContent = "Edit 😼"
	submitButton.dataset.id = id
}

export async function deleteCat(e) {
	const id = e.target.closest(".card").dataset.id
	// console.log(id)
	await axios.delete(`${baseUrl}/${id}`)
	e.target.closest(".card").remove()
}

export function displayForm() {
	resetForm()
	form.classList.remove("hidden")
}

export function resetForm() {
	qs("input#name", form).value = ""
	qs("input#url", form).value = ""
}
export function hideForm() {
	resetForm()
	form.classList.add("hidden")
}
