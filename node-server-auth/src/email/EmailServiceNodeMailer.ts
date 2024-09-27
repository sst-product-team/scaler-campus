import nodemailer from 'nodemailer';
import Env from '../env';
import EmailService from './EmailService';
import NewUserEmailDTO from '../models/NewUserEmailDTO';

class EmailServiceNodeMailer implements EmailService {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: Env.AUTH_SENDER_EMAIL,
              pass: Env.AUTH_SENDER_PASSWORD,
            },
        });

    }

    async sendBulkEmails(userData: NewUserEmailDTO[]): Promise<void> {
        console.log("Sending bulk emails");
        console.log("userData", userData);
        
        userData.forEach(async (user) => {
            console.log(`Sending email to ${user.email}`);            
            await this.sendNewUserEmail(user);
        });
    }

    async sendNewUserEmail(userData: NewUserEmailDTO): Promise<void> {

        const template = `
            <style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
  * {
    font-family: Lexend;
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
</style>
<div style="">
                <h1>Welcome to Scaler Campus</h1>
                <p>
                    Hello ${userData.email},<br><br>
                    Welcome to Scaler Campus. Your college has added you as a student on Scaler Campus. We have created an account on our platform for you. Your login details are attached below.<br><br>
                    You can download the Scaler Campus App from the this link: <a href="https://play.google.com/store/apps/details?id=com.scaler.campus">Download App</a><br><br>
                </p>
                <table><tbody>
                    <tr >
                        <td><b>Email</b>:</td>
                        <td>${userData.email}</td>
                    </tr>
                    <tr>
                        <td><b>Password</b>:</td>
                        <td>${userData.password}</td>
                    </tr>
                    <tr>
                        <td><b>Phone Number</b>:</td>
                        <td>${userData.phone}</td>
                    </tr>
                </tbody></table><br><br>
                <p>
                    You can login to the app using the above credentials. We recommend you to change your password after first login.<br>
                    If you have any queries, you can contact us at <a href="mailto:scaler-campus@outlook.com">Scaler Campus Support</a><br><br>
                </p>

                <p>
                    Regards,<br>
                    Scaler Campus
                </p>
            </div><br><br>
<div style="font-size:10px;">powered by SST Product Team</div>
        `

        const mailOptions = {
            from: Env.AUTH_SENDER_EMAIL,
            to: userData.email,
            subject: 'Welcome to Scaler Campus',
            html: template
        }

        await this.transporter.sendMail(mailOptions)
    }
}

export default EmailServiceNodeMailer;