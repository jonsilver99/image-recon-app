import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    public RegistrationForm: FormGroup;
    public Roles: Array<string> = ['admin', 'user'];

    constructor(public router: Router, private registerServ: RegistrationService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.RegistrationForm = new FormGroup({
            uname: new FormControl('', [Validators.required]),
            pass: new FormControl('', [Validators.required]),
            role: new FormControl('admin', [Validators.required])
            // passConfirm: new FormControl(null),
        },
            { validators: [] }, // this will validate that pass and passConfirm match at all times
        );
    }

    onSubmit() {
        // console.log(this.RegistrationForm);
        if (this.RegistrationForm.valid) {
            let userData = {
                username: this.RegistrationForm.get('uname').value,
                password: this.RegistrationForm.get('pass').value,
                role: this.RegistrationForm.get('role').value
            }
            this.registerServ.registerNewUserRequest(userData).subscribe(
                res => {
                    console.log(res)
                    if (res === 'registration success') {
                        this.router.navigate(['/Login'], { queryParams: { 'username': userData.username } });
                    }
                },
                err => { console.log(err) },
                () => { console.log('Observing complete') }
            )
        }
    }

    reset(event) {
        event.preventDefault();
        this.RegistrationForm.reset();
    }

    navigateToLoginForm(event) {
        event.preventDefault();
        this.router.navigate(['/Login']);
    }

}
