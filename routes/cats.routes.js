const router = require("express").Router()
const Cat = require("../models/Cat.model")
const uploader = require("../config/cloudinary.config")
/**
 * All the routes here are prefixed with /cats
 */

router.get("/", async (req, res, next) => {
	try {
		res.status(200).json(await Cat.find())
	} catch (error) {
		next(error)
	}
})

router.post("/", uploader.single("url"), async (req, res, next) => {
	try {
		if (req.file) {
			req.body.url = req.file.path
		}
		const catToCreate = req.body
		const catCreated = await Cat.create(catToCreate)
		res.status(201).json(catCreated)
	} catch (error) {
		next(error)
	}
})

router.patch("/:id", async (req, res, next) => {
	try {
		await Cat.findByIdAndUpdate(req.params.id, req.body)
		res.status(200).json({ message: `Good job, you updated ${req.params.id}` })
	} catch (error) {
		next(error)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		await Cat.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: `Good job, you deleted ${req.params.id}` })
	} catch (error) {
		next(error)
	}
})

module.exports = router
