export const transporter = {
  transport: {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD,
    },
  },
};
