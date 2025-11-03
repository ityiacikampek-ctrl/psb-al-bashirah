// src/lib/google-sheets.ts
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function getStudents() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Form Responses 1!A2:AV",
    });

    console.log("Data fetched:", response.data.values?.length || 0, "rows");
    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
}
