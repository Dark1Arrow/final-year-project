import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: [
      "https://final-year-project-five-navy.vercel.app",
      "https://final-year-project-dark1arrows-projects.vercel.app",
      /\.vercel\.app$/, // allow any vercel deployment
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "../app/api/routes/user.routes.js"
import walletRouter from "../app/api/routes/wallet.router.js"
import propertyRouter from "../app/api/routes/property.routes.js"
import bookingRouter from "../app/api/routes/booking.router.js"
import paymentRoter from "../app/api/routes/payment.route.js"
import reviewRouter from "../app/api/routes/review.route.js"
import notificationRouter from "../app/api/routes/notification.route.js"

//routes decleration
app.use("/v1/users", userRouter)
app.use("/v1/wallet", walletRouter)
app.use("/v1/property", propertyRouter)
app.use("/v1/booking", bookingRouter)
app.use("/v1/payment", paymentRoter)
app.use("/v1/review", reviewRouter)
app.use("/v1/notiifcation", notificationRouter)

export { app }