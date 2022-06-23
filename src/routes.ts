import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';
import {NodemailerMailAdapter} from './adapters/nodemailer/NodemailerMailAdapter'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const prismaFeedbacKsRepository = new PrismaFeedbacksRepository()
    const nodeMailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacKsRepository, nodeMailerMailAdapter)

    await submitFeedbackUseCase.execute({type, comment, screenshot})

    return res.status(201).send()
})