import Joi from "joi";

// Define JOI schema for note validation
export const noteSchema = Joi.object({
  note: Joi.string()
    .max(500)
    .regex(/^[A-Za-z0-9\s,.;!?'"()]*$/)
    .required()
    .messages({
      "string.base": "Note must be a string",
      "string.max": "Note must be less than or equal to 500 characters",
      "string.pattern.base":
        "Note can only contain letters, numbers, spaces, commas, periods, semicolons, exclamation marks, question marks, quotation marks, and parentheses",
    }),
});

// Function to validate note input
export const validateNote = (note: string) => {
  const { error } = noteSchema.validate({ note });
  if (error) {
    return error.details[0].message; // Return the first error message
  }
  return null; // Return null if no error
};

/* 
Författare: Isak

Joi schema och validation för att se till så användarens input är okej
*/
