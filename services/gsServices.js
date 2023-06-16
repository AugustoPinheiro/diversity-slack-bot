import { GoogleSpreadsheet } from "google-spreadsheet";

// Carrega o documento do Google Sheets
async function getDoc() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET);
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_EMAIL,
      private_key: process.env.GOOGLE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Erro ao obter o documento:", error);
    throw error;
  }
}

// Analisa o documento e retorna os dados desejados
async function parsedDoc() {
  try {
    const document = await getDoc();
    const documentRows = await document.sheetsByIndex[0].getRows();
    return documentRows.map((data) => {
      return {
        termo: data.termos,
        explicacao: data.explicacao,
        sugestoes: data.sugestoes,
      };
    });
  } catch (error) {
    console.error("Erro ao analisar o documento:", error);
    throw error;
  }
}

module.exports = {
  parsedDoc,
};
