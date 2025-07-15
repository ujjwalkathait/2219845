const fetch = require("node-fetch");

const register = async () => {
  const url = "http://20.244.56.144/evaluation-service/register";

  const payload = {
    email: "ujjwalsinghkathait.220112070@gehu.ac.in",
    name: "Ujjwal Singh Kathait",
    mobileNo: "9149378957",
    githubUsername: "ujjwalkathait",
    rollNo: "2219845",
    accessCode: "QAhDUr"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Registration failed:", data);
    } else {
      console.log("clientID:", data.clientID);
      console.log("clientSecret:", data.clientSecret);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};

register();
