// const Joi = require('@hapi/joi');

// const username = Joi.string().min(5).max(30).required().messages({
//   'string.username': `Not a Valid username `,
//   'string.empty': `username cannot be an empty field`,
//   'string.min': `usernameshould have a minimum length of {#limit}`,
//   'string.max': `username should have a maximum length of {#limit}`,
// });

// const password = Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]/).required().messages({
//   'string.pattern.base': `Password can only contain upper case and lower case characters and numbers`,
//   'string.empty': `Password cannot be an empty field`,
//   'string.min': `Password should have a minimum length of {#limit}`,
//   'string.max': `Password should have a maximum length of {#limit}`,
// })

// const name = Joi.string().min(8).max(30).pattern(/^[a-zA-Z' ]{3,20}$/).required().messages({
//   'string.pattern.base': `Your name can only contain lower and uppercase letters and apostrophes`,
//   'string.empty': `Name cannot be an empty field`,
//   'string.min': `Name should have a minimum length of {#limit}`,
//   'string.max': `Name should have a maximum length of {#limit}`,
// });

// exports.loginSchema = Joi.object({ username, password });
// exports.registerSchema = Joi.object({ name, username, password });
