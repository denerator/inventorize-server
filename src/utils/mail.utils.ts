import { IInventoryItem } from '../inventory/interfaces/inventory.interface';

interface IMailParams {
  email: string;
  items: IInventoryItem[];
}

export const createMailReport = (params: IMailParams) => {
  return {
    from: 'denwork289@gmail.com',
    to: params.email,
    subject: 'Report',
    text: 'Report',
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Звіт</title>
        <style>
          h1 {
            font-size: 30px;
            color: #fff;
            text-transform: uppercase;
            font-weight: 300;
            text-align: center;
            margin-bottom: 15px;
          }
          table {
            width: 100%;
            table-layout: fixed;
          }
          .tbl-header {
            background-color: rgba(255, 255, 255, 0.3);
          }
          .tbl-content {
            margin-top: 0px;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          th {
            padding: 20px 15px;
            text-align: left;
            font-weight: 500;
            font-size: 12px;
            color: #fff;
            text-transform: uppercase;
          }
          td {
            padding: 15px;
            text-align: left;
            vertical-align: middle;
            font-weight: 300;
            font-size: 12px;
            color: #fff;
            border-bottom: solid 1px rgba(255, 255, 255, 0.1);
          }
          body {
            font-family: "Roboto", sans-serif;
          }
          section {
            background: #1d2126;
            margin: 50px;
          }
        </style>
      </head>
      <body>
        <section>
          <h1>Звіт про зареєстровані товари</h1>
          <div class="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Код</th>
                  <th>Ціна</th>
                  <th>Відповідальний</th>
                  <th>Кількість</th>
                  <th>Дата створення</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbl-content">
            <table>
              <tbody>
              ${generateRows(params.items)}
              </tbody>
            </table>
          </div>
        </section>
      </body>
    </html>
    `,
  };
};

const generateRows = (items) => {
  let rows = '';

  for (const item of items) {
    rows += `<tr><td>${item.name}</td><td>${item.code}</td><td>${
      item.price
    }</td><td>${item.responsible}</td><td>${item.amount}</td><td>${new Date(
      item.createdAt,
    ).toLocaleDateString()}</td></tr>`;
  }

  return rows;
};
