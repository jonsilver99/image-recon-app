import { Validators, FormControl, ValidatorFn, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";

export class Costume_validators {
    static passCheckForNums(): ValidatorFn {
        let nums = new RegExp(/\d/g);
        return (fcont) => {
            if (!nums.test(fcont.value)) {
                return { 'validnums': 'Password must contain at least 1 digit' }
            }
            return null;
        }
    }

    static emailCheckIfExists(email: FormControl): Promise<any> | Observable<any> {
        let existingEmails = [
            'a@b.com',
            'c@d.com',
            'e@f.com'
        ];
        return new Promise((resolve, reject) => {
            // this will address the server and database to check if email exists
            setTimeout(() => {
                if (existingEmails.includes(email.value)) {
                    resolve({ 'existingEmail': 'This address already exists' });
                } else {
                    resolve(null);
                }
            }, 2000)
        })
    }

    static chkPasswordMatch(): ValidatorFn {
        return (form: FormGroup) => {
            if (form.get('pass').value != form.get('passConfirm').value) {
                form.get('passConfirm').setErrors({ 'passwordMatchErr': 'Password and password confirm dont match' })
            } else {
                return null
            }
        }
    }
}