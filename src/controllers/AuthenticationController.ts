import { AuthenticationService } from "../services/authentication/authentication.service";
const authenticationService = new AuthenticationService()
export class AuthenticationController {
    async login(req: any, res: any, next: any) {
        const username = req.body.username;
        const password = req.body.password;
        try {            
            const user = await authenticationService.login(username, password);
            console.log('Login!');
            res.json(user);
        } catch (error: any) {
            next(error);
        }
    }
    async getAccount(req: any, res: any, next: any) {
        const id = req.user.accountId;
        console.log(req.user);
        
        try {
            const user = await authenticationService.getAccount(id);
            res.json(user);
        } catch (error: any) {
            next(error);
        }
    }
}
