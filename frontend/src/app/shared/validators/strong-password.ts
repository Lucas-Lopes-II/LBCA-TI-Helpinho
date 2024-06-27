import { AbstractControl } from "@angular/forms";

export function strongPasswordValidator(control: AbstractControl) {
    const regex = /(?=^.{6,}$)((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const isStrongPassword = regex.test(control.value);

    if (!isStrongPassword) {
        return { strongPassword: true }
    } else {
        return null;
    }
}