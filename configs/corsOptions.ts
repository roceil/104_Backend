const allowOrigin = ["https://104social-front-end.vercel.app", "http://localhost:3000"]

export const corsOptions = {
  origin: allowOrigin,
  optionsSuccessStatus: 200,
  credentials: true
}
