require("dotenv").config();

module.exports = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGIN.split(",");
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  optionsSuccessStatus: 200,
};
