import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/forms";
function Login_Conditional_11_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "El usuario es obligatorio.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_11_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "M\u00EDnimo 4 caracteres.");
    i0.ɵɵelementEnd();
} }
function Login_Conditional_11_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.errorMessage());
} }
function Login_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h1");
    i0.ɵɵtext(1, "Bienvenido de nuevo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Inicia sesi\u00F3n para administrar tu tienda");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "form", 13, 0);
    i0.ɵɵlistener("ngSubmit", function Login_Conditional_11_Template_form_ngSubmit_4_listener() { i0.ɵɵrestoreView(_r1); const loginForm_r2 = i0.ɵɵreference(5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.iniciarSesion(loginForm_r2)); });
    i0.ɵɵelementStart(6, "label", 14)(7, "span");
    i0.ɵɵtext(8, "Usuario");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 15, 1);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_11_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.loginData.usuario, $event) || (ctx_r2.loginData.usuario = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(11, Login_Conditional_11_Conditional_11_Template, 2, 0, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "label", 14)(13, "span");
    i0.ɵɵtext(14, "Contrase\u00F1a");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "input", 17, 2);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_11_Template_input_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.loginData.contrasena, $event) || (ctx_r2.loginData.contrasena = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(17, Login_Conditional_11_Conditional_17_Template, 2, 0, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(18, Login_Conditional_11_Conditional_18_Template, 2, 1, "p", 18);
    i0.ɵɵelementStart(19, "div", 19)(20, "button", 20);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 21);
    i0.ɵɵlistener("click", function Login_Conditional_11_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showRegister()); });
    i0.ɵɵtext(23, " Registrarse ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const usuarioField_r4 = i0.ɵɵreference(10);
    const contrasenaField_r5 = i0.ɵɵreference(16);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.loginData.usuario);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(usuarioField_r4.invalid && usuarioField_r4.touched ? 11 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.loginData.contrasena);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(contrasenaField_r5.invalid && contrasenaField_r5.touched ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.errorMessage() ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isSubmitting() ? "Ingresando..." : "Iniciar sesi\u00F3n", " ");
} }
function Login_Conditional_12_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.errorMessage());
} }
function Login_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h1");
    i0.ɵɵtext(1, "Crea tu cuenta");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Reg\u00EDstrate para empezar a administrar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "form", 13, 3);
    i0.ɵɵlistener("ngSubmit", function Login_Conditional_12_Template_form_ngSubmit_4_listener() { i0.ɵɵrestoreView(_r6); const registerForm_r7 = i0.ɵɵreference(5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.crearCuenta(registerForm_r7)); });
    i0.ɵɵelementStart(6, "label", 14)(7, "span");
    i0.ɵɵtext(8, "Usuario");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 22);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_12_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.registerData.usuario, $event) || (ctx_r2.registerData.usuario = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "label", 14)(11, "span");
    i0.ɵɵtext(12, "Correo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 23);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_12_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.registerData.correo, $event) || (ctx_r2.registerData.correo = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "label", 14)(15, "span");
    i0.ɵɵtext(16, "Contrase\u00F1a");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_12_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.registerData.contrasena, $event) || (ctx_r2.registerData.contrasena = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label", 14)(19, "span");
    i0.ɵɵtext(20, "Confirmar contrase\u00F1a");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 25);
    i0.ɵɵtwoWayListener("ngModelChange", function Login_Conditional_12_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.registerData.confirmarContrasena, $event) || (ctx_r2.registerData.confirmarContrasena = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, Login_Conditional_12_Conditional_22_Template, 2, 1, "p", 18);
    i0.ɵɵelementStart(23, "div", 19)(24, "button", 20);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 21);
    i0.ɵɵlistener("click", function Login_Conditional_12_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cancelRegister()); });
    i0.ɵɵtext(27, " Cancelar ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.registerData.usuario);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.registerData.correo);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.registerData.contrasena);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.registerData.confirmarContrasena);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.errorMessage() ? 22 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.isSubmitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isSubmitting() ? "Creando..." : "Crear cuenta", " ");
} }
export class Login {
    router;
    isRegistering = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isRegistering" }] : /* istanbul ignore next */ []));
    isSubmitting = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isSubmitting" }] : /* istanbul ignore next */ []));
    errorMessage = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "errorMessage" }] : /* istanbul ignore next */ []));
    loginData = {
        usuario: '',
        contrasena: '',
    };
    registerData = {
        usuario: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
    };
    constructor(router) {
        this.router = router;
    }
    iniciarSesion(form) {
        if (form.invalid) {
            this.errorMessage.set('Completa tu usuario y contraseña para continuar.');
            return;
        }
        this.errorMessage.set('');
        this.isSubmitting.set(true);
        // Simula una validación contra el backend
        setTimeout(() => {
            this.isSubmitting.set(false);
            this.router.navigate(['/panel-admin']);
        }, 400);
    }
    crearCuenta(form) {
        if (form.invalid) {
            this.errorMessage.set('Revisa los campos del formulario de registro.');
            return;
        }
        if (this.registerData.contrasena !== this.registerData.confirmarContrasena) {
            this.errorMessage.set('Las contraseñas no coinciden.');
            return;
        }
        this.errorMessage.set('');
        this.isSubmitting.set(true);
        setTimeout(() => {
            this.isSubmitting.set(false);
            this.isRegistering.set(false);
        }, 400);
    }
    showRegister() {
        this.errorMessage.set('');
        this.isRegistering.set(true);
    }
    cancelRegister() {
        this.errorMessage.set('');
        this.isRegistering.set(false);
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Login)(i0.ɵɵdirectiveInject(i1.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], decls: 13, vars: 2, consts: [["loginForm", "ngForm"], ["usuarioField", "ngModel"], ["contrasenaField", "ngModel"], ["registerForm", "ngForm"], [1, "login-container"], [1, "backdrop"], [1, "noise"], [1, "login-card"], [1, "brand"], ["aria-hidden", "true", 1, "brand-icon"], ["viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M12 2L3 6.5V11.5C3 16.7 6.8 21.4 12 22.5C17.2 21.4 21 16.7 21 11.5V6.5L12 2Z", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linejoin", "round"], ["d", "M8.5 12L11 14.5L15.5 9.5", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round"], ["novalidate", "", 3, "ngSubmit"], [1, "field"], ["type", "text", "name", "usuario", "placeholder", "Ingresa tu usuario", "required", "", 3, "ngModelChange", "ngModel"], [1, "field-error"], ["type", "password", "name", "contrasena", "placeholder", "Ingresa tu contrase\u00F1a", "required", "", "minlength", "4", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "form-error"], [1, "buttons"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "text", "name", "usuario", "placeholder", "Ingresa un usuario", "required", "", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "correo", "placeholder", "Ingresa tu correo", "required", "", "email", "", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "contrasena", "placeholder", "Ingresa una contrase\u00F1a", "required", "", "minlength", "4", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "confirmarContrasena", "placeholder", "Confirma tu contrase\u00F1a", "required", "", 3, "ngModelChange", "ngModel"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵelement(1, "div", 5)(2, "div", 6);
            i0.ɵɵelementStart(3, "div", 7)(4, "div", 8)(5, "div", 9);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(6, "svg", 10);
            i0.ɵɵelement(7, "path", 11)(8, "path", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(9, "span");
            i0.ɵɵtext(10, "Panel Admin");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, Login_Conditional_11_Template, 24, 7);
            i0.ɵɵconditionalCreate(12, Login_Conditional_12_Template, 28, 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(!ctx.isRegistering() ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRegistering() ? 12 : -1);
        } }, dependencies: [FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MinLengthValidator, i2.EmailValidator, i2.NgModel, i2.NgForm], styles: [".login-container[_ngcontent-%COMP%] {\n    position: fixed;\n    inset: 0;\n\n    width: 100%;\n    height: 100vh;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    overflow: hidden;\n    padding: 20px;\n}\n\n.backdrop[_ngcontent-%COMP%] {\n    position: absolute;\n    inset: 0;\n    z-index: 0;\n\n    background:\n        radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.55), transparent 45%),\n        radial-gradient(circle at 85% 80%, rgba(34, 211, 238, 0.35), transparent 50%),\n        linear-gradient(135deg, #1e1b3a 0%, #312e81 55%, #4338ca 100%);\n}\n\n\n.noise[_ngcontent-%COMP%] {\n    position: absolute;\n    inset: 0;\n    z-index: 1;\n\n    opacity: .1;\n\n    background-image:\n        repeating-radial-gradient(\n            circle at center,\n            rgba(255, 255, 255, .08) 0,\n            rgba(255, 255, 255, .08) 1px,\n            transparent 1px,\n            transparent 2px\n        );\n\n    pointer-events: none;\n}\n\n.login-card[_ngcontent-%COMP%] {\n    position: relative;\n    z-index: 10;\n\n    width: 100%;\n    max-width: 420px;\n\n    padding: 44px 40px;\n\n    background: rgba(27, 28, 115, 0.55);\n    backdrop-filter: blur(18px);\n    -webkit-backdrop-filter: blur(18px);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: var(--radius-lg, 20px);\n\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n\n    box-shadow: 0 20px 60px rgba(0, 0, 0, .45);\n\n    animation: _ngcontent-%COMP%_card-in .35s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_card-in {\n    from { opacity: 0; transform: translateY(12px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.brand[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n\n    margin-bottom: 28px;\n    color: #cdd1ff;\n    font-weight: 600;\n    font-size: 14px;\n    letter-spacing: .04em;\n    text-transform: uppercase;\n}\n\n.brand-icon[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--color-accent, #22d3ee);\n}\n\n.brand-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 100%;\n}\n\n.login-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 30px;\n    font-weight: 700;\n    text-align: left;\n    margin: 0 0 8px;\n}\n\n.login-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    color: rgba(255, 255, 255, 0.75);\n    font-size: 15px;\n    font-weight: 400;\n    text-align: left;\n    line-height: 1.4;\n    margin: 0 0 28px;\n}\n\nform[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.field[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    margin-bottom: 18px;\n}\n\n.field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    color: rgba(255, 255, 255, 0.85);\n    font-size: 13px;\n    font-weight: 500;\n}\n\ninput[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 46px;\n\n    border: 1px solid rgba(255, 255, 255, 0.16);\n    outline: none;\n    border-radius: var(--radius-sm, 8px);\n\n    padding: 0 14px;\n\n    background: rgba(255, 255, 255, 0.92);\n    color: #1e1b3a;\n\n    font-size: 15px;\n    font-family: inherit;\n\n    transition: border-color .15s, box-shadow .15s;\n}\n\ninput[_ngcontent-%COMP%]::placeholder {\n    color: #9295a5;\n}\n\ninput[_ngcontent-%COMP%]:focus {\n    border-color: var(--color-accent, #22d3ee);\n    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.25);\n}\n\ninput.ng-invalid.ng-touched[_ngcontent-%COMP%] {\n    border-color: var(--color-danger, #ef4444);\n}\n\n.field-error[_ngcontent-%COMP%] {\n    color: #fca5a5;\n    font-size: 12.5px;\n}\n\n.form-error[_ngcontent-%COMP%] {\n    background: rgba(239, 68, 68, 0.15);\n    border: 1px solid rgba(239, 68, 68, 0.4);\n    color: #fecaca;\n    font-size: 13.5px;\n    padding: 10px 12px;\n    border-radius: var(--radius-sm, 8px);\n    margin: 4px 0 18px;\n}\n\n.buttons[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 10px;\n    margin-top: 6px;\n}\n\nbutton[_ngcontent-%COMP%] {\n    flex: 1;\n    border: none;\n    border-radius: var(--radius-sm, 8px);\n\n    height: 46px;\n    padding: 0 20px;\n\n    font-size: 15px;\n    font-weight: 600;\n    cursor: pointer;\n\n    transition: transform .15s, opacity .15s, background .15s;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n    background: linear-gradient(135deg, var(--color-accent, #22d3ee), var(--color-primary-light, #6366f1));\n    color: #101126;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    transform: translateY(-1px);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n    opacity: .65;\n    cursor: not-allowed;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n    background: rgba(255, 255, 255, 0.1);\n    color: white;\n    border: 1px solid rgba(255, 255, 255, 0.22);\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n    background: rgba(255, 255, 255, 0.18);\n}\n\n@media (max-width: 480px) {\n    .login-card[_ngcontent-%COMP%] {\n        padding: 32px 24px;\n    }\n\n    .buttons[_ngcontent-%COMP%] {\n        flex-direction: column;\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [FormsModule], template: "<div class=\"login-container\">\n    <div class=\"backdrop\"></div>\n    <div class=\"noise\"></div>\n\n    <div class=\"login-card\">\n        <div class=\"brand\">\n            <div class=\"brand-icon\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M12 2L3 6.5V11.5C3 16.7 6.8 21.4 12 22.5C17.2 21.4 21 16.7 21 11.5V6.5L12 2Z\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/>\n                    <path d=\"M8.5 12L11 14.5L15.5 9.5\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                </svg>\n            </div>\n            <span>Panel Admin</span>\n        </div>\n\n        <!-- LOGIN -->\n        @if (!isRegistering()) {\n        <h1>Bienvenido de nuevo</h1>\n        <h2>Inicia sesi\u00F3n para administrar tu tienda</h2>\n\n        <form #loginForm=\"ngForm\" (ngSubmit)=\"iniciarSesion(loginForm)\" novalidate>\n            <label class=\"field\">\n                <span>Usuario</span>\n                <input\n                    type=\"text\"\n                    name=\"usuario\"\n                    placeholder=\"Ingresa tu usuario\"\n                    [(ngModel)]=\"loginData.usuario\"\n                    required\n                    #usuarioField=\"ngModel\">\n                @if (usuarioField.invalid && usuarioField.touched) {\n                <small class=\"field-error\">El usuario es obligatorio.</small>\n                }\n            </label>\n\n            <label class=\"field\">\n                <span>Contrase\u00F1a</span>\n                <input\n                    type=\"password\"\n                    name=\"contrasena\"\n                    placeholder=\"Ingresa tu contrase\u00F1a\"\n                    [(ngModel)]=\"loginData.contrasena\"\n                    required\n                    minlength=\"4\"\n                    #contrasenaField=\"ngModel\">\n                @if (contrasenaField.invalid && contrasenaField.touched) {\n                <small class=\"field-error\">M\u00EDnimo 4 caracteres.</small>\n                }\n            </label>\n\n            @if (errorMessage()) {\n            <p class=\"form-error\" role=\"alert\">{{ errorMessage() }}</p>\n            }\n\n            <div class=\"buttons\">\n                <button type=\"submit\" class=\"btn-primary\" [disabled]=\"isSubmitting()\">\n                    {{ isSubmitting() ? 'Ingresando...' : 'Iniciar sesi\u00F3n' }}\n                </button>\n                <button type=\"button\" class=\"btn-secondary\" (click)=\"showRegister()\">\n                    Registrarse\n                </button>\n            </div>\n        </form>\n        }\n\n        <!-- REGISTRO -->\n        @if (isRegistering()) {\n        <h1>Crea tu cuenta</h1>\n        <h2>Reg\u00EDstrate para empezar a administrar</h2>\n\n        <form #registerForm=\"ngForm\" (ngSubmit)=\"crearCuenta(registerForm)\" novalidate>\n            <label class=\"field\">\n                <span>Usuario</span>\n                <input\n                    type=\"text\"\n                    name=\"usuario\"\n                    placeholder=\"Ingresa un usuario\"\n                    [(ngModel)]=\"registerData.usuario\"\n                    required>\n            </label>\n\n            <label class=\"field\">\n                <span>Correo</span>\n                <input\n                    type=\"email\"\n                    name=\"correo\"\n                    placeholder=\"Ingresa tu correo\"\n                    [(ngModel)]=\"registerData.correo\"\n                    required\n                    email>\n            </label>\n\n            <label class=\"field\">\n                <span>Contrase\u00F1a</span>\n                <input\n                    type=\"password\"\n                    name=\"contrasena\"\n                    placeholder=\"Ingresa una contrase\u00F1a\"\n                    [(ngModel)]=\"registerData.contrasena\"\n                    required\n                    minlength=\"4\">\n            </label>\n\n            <label class=\"field\">\n                <span>Confirmar contrase\u00F1a</span>\n                <input\n                    type=\"password\"\n                    name=\"confirmarContrasena\"\n                    placeholder=\"Confirma tu contrase\u00F1a\"\n                    [(ngModel)]=\"registerData.confirmarContrasena\"\n                    required>\n            </label>\n\n            @if (errorMessage()) {\n            <p class=\"form-error\" role=\"alert\">{{ errorMessage() }}</p>\n            }\n\n            <div class=\"buttons\">\n                <button type=\"submit\" class=\"btn-primary\" [disabled]=\"isSubmitting()\">\n                    {{ isSubmitting() ? 'Creando...' : 'Crear cuenta' }}\n                </button>\n                <button type=\"button\" class=\"btn-secondary\" (click)=\"cancelRegister()\">\n                    Cancelar\n                </button>\n            </div>\n        </form>\n        }\n    </div>\n</div>", styles: [".login-container {\n    position: fixed;\n    inset: 0;\n\n    width: 100%;\n    height: 100vh;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    overflow: hidden;\n    padding: 20px;\n}\n\n.backdrop {\n    position: absolute;\n    inset: 0;\n    z-index: 0;\n\n    background:\n        radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.55), transparent 45%),\n        radial-gradient(circle at 85% 80%, rgba(34, 211, 238, 0.35), transparent 50%),\n        linear-gradient(135deg, #1e1b3a 0%, #312e81 55%, #4338ca 100%);\n}\n\n/* Granulado sutil para dar textura al fondo */\n.noise {\n    position: absolute;\n    inset: 0;\n    z-index: 1;\n\n    opacity: .1;\n\n    background-image:\n        repeating-radial-gradient(\n            circle at center,\n            rgba(255, 255, 255, .08) 0,\n            rgba(255, 255, 255, .08) 1px,\n            transparent 1px,\n            transparent 2px\n        );\n\n    pointer-events: none;\n}\n\n.login-card {\n    position: relative;\n    z-index: 10;\n\n    width: 100%;\n    max-width: 420px;\n\n    padding: 44px 40px;\n\n    background: rgba(27, 28, 115, 0.55);\n    backdrop-filter: blur(18px);\n    -webkit-backdrop-filter: blur(18px);\n    border: 1px solid rgba(255, 255, 255, 0.14);\n    border-radius: var(--radius-lg, 20px);\n\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n\n    box-shadow: 0 20px 60px rgba(0, 0, 0, .45);\n\n    animation: card-in .35s ease-out;\n}\n\n@keyframes card-in {\n    from { opacity: 0; transform: translateY(12px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.brand {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n\n    margin-bottom: 28px;\n    color: #cdd1ff;\n    font-weight: 600;\n    font-size: 14px;\n    letter-spacing: .04em;\n    text-transform: uppercase;\n}\n\n.brand-icon {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--color-accent, #22d3ee);\n}\n\n.brand-icon svg {\n    width: 100%;\n    height: 100%;\n}\n\n.login-card h1 {\n    color: white;\n    font-size: 30px;\n    font-weight: 700;\n    text-align: left;\n    margin: 0 0 8px;\n}\n\n.login-card h2 {\n    color: rgba(255, 255, 255, 0.75);\n    font-size: 15px;\n    font-weight: 400;\n    text-align: left;\n    line-height: 1.4;\n    margin: 0 0 28px;\n}\n\nform {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n}\n\n.field {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    margin-bottom: 18px;\n}\n\n.field span {\n    color: rgba(255, 255, 255, 0.85);\n    font-size: 13px;\n    font-weight: 500;\n}\n\ninput {\n    width: 100%;\n    height: 46px;\n\n    border: 1px solid rgba(255, 255, 255, 0.16);\n    outline: none;\n    border-radius: var(--radius-sm, 8px);\n\n    padding: 0 14px;\n\n    background: rgba(255, 255, 255, 0.92);\n    color: #1e1b3a;\n\n    font-size: 15px;\n    font-family: inherit;\n\n    transition: border-color .15s, box-shadow .15s;\n}\n\ninput::placeholder {\n    color: #9295a5;\n}\n\ninput:focus {\n    border-color: var(--color-accent, #22d3ee);\n    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.25);\n}\n\ninput.ng-invalid.ng-touched {\n    border-color: var(--color-danger, #ef4444);\n}\n\n.field-error {\n    color: #fca5a5;\n    font-size: 12.5px;\n}\n\n.form-error {\n    background: rgba(239, 68, 68, 0.15);\n    border: 1px solid rgba(239, 68, 68, 0.4);\n    color: #fecaca;\n    font-size: 13.5px;\n    padding: 10px 12px;\n    border-radius: var(--radius-sm, 8px);\n    margin: 4px 0 18px;\n}\n\n.buttons {\n    display: flex;\n    gap: 10px;\n    margin-top: 6px;\n}\n\nbutton {\n    flex: 1;\n    border: none;\n    border-radius: var(--radius-sm, 8px);\n\n    height: 46px;\n    padding: 0 20px;\n\n    font-size: 15px;\n    font-weight: 600;\n    cursor: pointer;\n\n    transition: transform .15s, opacity .15s, background .15s;\n}\n\n.btn-primary {\n    background: linear-gradient(135deg, var(--color-accent, #22d3ee), var(--color-primary-light, #6366f1));\n    color: #101126;\n}\n\n.btn-primary:hover:not(:disabled) {\n    transform: translateY(-1px);\n}\n\n.btn-primary:disabled {\n    opacity: .65;\n    cursor: not-allowed;\n}\n\n.btn-secondary {\n    background: rgba(255, 255, 255, 0.1);\n    color: white;\n    border: 1px solid rgba(255, 255, 255, 0.22);\n}\n\n.btn-secondary:hover {\n    background: rgba(255, 255, 255, 0.18);\n}\n\n@media (max-width: 480px) {\n    .login-card {\n        padding: 32px 24px;\n    }\n\n    .buttons {\n        flex-direction: column;\n    }\n}\n"] }]
    }], () => [{ type: i1.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/login/login.ts", lineNumber: 12 }); })();
