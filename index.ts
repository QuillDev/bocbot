import QuillClient from "./src/abstract/QuillClient";
require("dotenv").config();

new QuillClient({})
    .login(process.env.DISCORD_TOKEN)
    .catch(console.error);