export interface EnvBindings{
  DATABASE_URL: string,
  JWT_SECRET: string
}

export interface Signup {
  email: string
  name: string
  password: string
}

export interface Signin{
  email: string,
  password: string
}

export interface UpdateUser{
  name?: string
  password?: string
}

export interface Prisma{
  prisma: string
}