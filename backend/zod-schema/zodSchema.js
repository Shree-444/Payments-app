const zod = require('zod')

const usernameSchema = zod
    .string()
    .min(1, {msg: 'username cannot be empty'})
    .max(30, {msg: 'username cannot exceed 30 characters'})
    .refine(username => username.length > 0, {msg: 'username cannot be empty'})

const passwordSchema = zod
    .string()
    .min(4, {msg: 'Password must be at least 4 characters long'})
    .max(16, {msg: 'Password must be at most 16 characters long'})
    .refine(password => password.length > 0, {msg: 'Password cannot be empty'})

const firstNameSchema = zod
    .string()
    .min(2, {msg: 'Name must be at least 2 characters long'})
    .max(15, {msg: 'Name must be at most 6 characters long'})
    .refine(name => name.length > 0, {msg: 'First name cannot be empty'})

const lastNameSchema = zod
    .string()
    .min(2, {msg: 'Name must be at least 2 characters long'})
    .max(15, {msg: 'Name must be at most 6 characters long'})
    .refine(name => name.length > 0, {msg: 'Last name cannot be empty'})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    username: zod.string().optional()
})

module.exports = {
    usernameSchema,
    passwordSchema,
    firstNameSchema,
    lastNameSchema,
    updateBody
}