import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private toastController: ToastController;

    constructor() {
        this.toastController = new ToastController;
    }

    async showToast(error: string, title: string, color: string, position) {
        const toast = await this.toastController.create({
            header: title,
            message: error,
            color: color,
            position: position,
            buttons: [
                {
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        });
        toast.present();
    }

}

