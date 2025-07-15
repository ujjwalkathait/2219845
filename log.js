const fetch = require("node-fetch"); // using node-fetch@2

const sendLog = async () => {
  const url = "http://20.244.56.144/evaluation-service/logs";

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1amp3YWxzaW5naGthdGhhaXQuMjIwMTEyMDcwQGdlaHUuYWMuaW4iLCJleHAiOjE3NTI1NTg0MDQsImlhdCI6MTc1MjU1NzUwNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjJlYTA0N2QyLTlhMTMtNGI3NS05Mjk4LTNlODFkMWVlNmQ2ZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InVqandhbCBzaW5naCBrYXRoYWl0Iiwic3ViIjoiYTJjZGNlM2ItMjUzNi00MDE2LWJhMjUtMzQzNjdjYjAxYzcwIn0sImVtYWlsIjoidWpqd2Fsc2luZ2hrYXRoYWl0LjIyMDExMjA3MEBnZWh1LmFjLmluIiwibmFtZSI6InVqandhbCBzaW5naCBrYXRoYWl0Iiwicm9sbE5vIjoiMjIxOTg0NSIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6ImEyY2RjZTNiLTI1MzYtNDAxNi1iYTI1LTM0MzY3Y2IwMWM3MCIsImNsaWVudFNlY3JldCI6InFWV2hnd1RZUFBhekVISGcifQ.rCQVdLuq1XnQrQ4Ny7jCdoJjB3J7-CWTWaph_l-UwLI"; // From auth.js

  const payload = {
    stack: "frontend",             // required value
    level: "info",                 // info, debug, warn, error, fatal
    package: "component",          // component, hook, utils, etc.
    message: "React button clicked in navbar component"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Log failed:", data);
    } else {
      console.log("Log sent successfully!");
      console.log("Server Response:", data);
    }
  } catch (err) {
    console.error("Error sending log:", err.message);
  }
};

sendLog();
