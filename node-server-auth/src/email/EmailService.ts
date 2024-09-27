import NewUserEmailDTO from "../models/NewUserEmailDTO";

interface EmailService {
    sendNewUserEmail(userData: NewUserEmailDTO): Promise<void>;
    sendBulkEmails(userData: NewUserEmailDTO[]): Promise<void>;
}

export default EmailService;