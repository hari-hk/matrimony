import { expressionType } from "@angular/compiler/src/output/output_ast";

export class Login {
    mobile: string;
    password: string;
}

export class LoginResponse {
    status: boolean;
    token: string;
}