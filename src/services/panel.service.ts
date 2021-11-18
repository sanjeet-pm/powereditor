import { Subject } from 'rxjs';
const subject = new Subject();
export const panelService = {
    sendMessage: (message: string) => subject.next({ text: message }),
    clearMessages: () => subject.next(''),
    getMessage: () => subject.asObservable()
};