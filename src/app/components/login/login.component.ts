import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Costume_validators } from '../../models/costume_form_validators';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public LoginForm: FormGroup;

    constructor(public loginServ: LoginService, public router: Router, public route?: ActivatedRoute) { }

    ngOnInit() {
        this.initForm();
        this.route.queryParams.subscribe((quryPrms) => {
            if (quryPrms && quryPrms.username) {
                // console.log(quryPrms);
                this.LoginForm.patchValue({ 'uname': quryPrms.username })
            }
        });
    }

    initForm() {
        this.LoginForm = new FormGroup({
            uname: new FormControl('', [Validators.required]),
            pass: new FormControl('', [Validators.required]),
            // passConfirm: new FormControl(null),
        },
            { validators: [] }, // this will validate that pass and passConfirm match at all times
        );
    }

    onSubmit() {
        // console.log(this.LoginForm);
        if (this.LoginForm.valid) {
            let userData = {
                username: this.LoginForm.get('uname').value,
                password: this.LoginForm.get('pass').value
            }
            this.loginServ.loginRequest(userData).subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    console.log("Observing complete");
                }
            )
        }
    }

    reset(event) {
        event.preventDefault();
        this.LoginForm.reset();
    }

    navigateToRegistrationForm(event) {
        event.preventDefault();
        this.router.navigate(['/Register']);
    }
}