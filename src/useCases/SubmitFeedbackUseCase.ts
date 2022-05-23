import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

export interface SubmitFeedbackUseCaseRequest {
    type: String,
    comment: String,
    screenshot?: String
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}
    async execute(request:SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;
        
        await this.feedbacksRepository.create({type, comment, screenshot})

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family : sans-seif; font-size: 16px; color:#111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}