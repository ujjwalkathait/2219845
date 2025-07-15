const fetch = require("node-fetch"); // use node-fetch v2

const authenticate = async () => {
  const url = "http://20.244.56.144/evaluation-service/auth";

  const payload = {
    email: "ujjwalsinghkathait.220112070@gehu.ac.in",
    name: "Ujjwal Singh Kathait",
    rollNo: "2219845",
    accessCode: "QAhDUr",
    clientID: "a2cdce3b-2536-4016-ba25-34367cb01c70",
    clientSecret: "qVWhgwTYPPazEHHg"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Authentication failed:", data);
    } else {
      console.log("token_type:", data.token_type);
      console.log("access_token:", data.access_token);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};

authenticate();
