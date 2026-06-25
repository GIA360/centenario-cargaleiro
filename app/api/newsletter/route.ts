import { NextResponse } from "next/server";
import { google } from "googleapis";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ erro: "Email inválido." }, { status: 400 });
  }

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.error("Newsletter: configuração do Google Sheets em falta.");
    return NextResponse.json({ erro: "Serviço indisponível." }, { status: 500 });
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Subscrições!A:B",
      valueInputOption: "RAW",
      requestBody: { values: [[email, new Date().toISOString()]] },
    });
  } catch (erro) {
    console.error("Newsletter: falha ao escrever na Google Sheet.", erro);
    return NextResponse.json({ erro: "Não foi possível registar a subscrição." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
