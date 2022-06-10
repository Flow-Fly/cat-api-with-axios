import { qs, qsa } from "./utils.js"
import * as cat from "./cats-handling.js"
console.log("cat", cat)

cat.getCatsButton.addEventListener("click", cat.getCats)
cat.createCatButton.addEventListener("click", cat.displayForm)
cat.submitButton.addEventListener("click", cat.handleSubmit)
cat.form.addEventListener("keydown", () => (cat.errorMessage.textContent = ""))
