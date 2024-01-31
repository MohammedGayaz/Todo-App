const zod = require("zod")

// task validation scheme

const taskCreation = zod.object({
    title : zod.string(),
    description : zod.string(),
})

const taskUpdation = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional()
})


module.exports = {
    taskCreation,
    taskUpdation,
}
