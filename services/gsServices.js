const { GoogleSpreadsheet } = require("google-spreadsheet");

const getDoc = async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET);
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_EMAIL,
      private_key: process.env.GOOGLE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error(error);
  }
};

const parsedDoc = async () => {
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
    console.error(error);
  }
};

module.exports = {
  parsedDoc,
};
