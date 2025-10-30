import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: [
      "https://final-year-project-qy10w4ftt-dark1arrows-projects.vercel.app", // your frontend Vercel domain
      "http://localhost:3000", // for local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you're using cookies or tokens
  })
);

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"
import walletRouter from "./routes/wallet.router.js"
import propertyRouter from "./routes/property.routes.js"
import bookingRouter from "./routes/booking.router.js"
import paymentRoter from "./routes/payment.route.js"
import reviewRouter from "./routes/review.route.js"
import notificationRouter from "./routes/notification.route.js"

//routes decleration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/wallet", walletRouter)
app.use("/api/v1/property", propertyRouter)
app.use("/api/v1/booking", bookingRouter)
app.use("/api/v1/payment", paymentRoter)
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/notiifcation", notificationRouter)

export { app }