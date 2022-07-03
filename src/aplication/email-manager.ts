import nodemailer from "nodemailer";

export const emailManager = {
  async sendEmail(registratedUser: any) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sergeydevsergey@gmail.com", // generated ethereal user
          pass: "blgzbrsdqjsruzjd", // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: registratedUser.accountData.email, // list of receivers
        subject: "registration", // Subject line
        html: `<a href="http://localhost:5001/auth/registration-confirmation?code=${registratedUser.emailConfirmation.confirmCode}">Click</a>`, // html body
      });

      console.log("info", info);
    } catch (error) {
      console.log(error);
    }
  },
};
