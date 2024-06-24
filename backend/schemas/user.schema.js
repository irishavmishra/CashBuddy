import zod from "zod";

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export { signupSchema, signinSchema };
