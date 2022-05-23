import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import { PrismaFeedbacKsRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';
import {NodemailerMailAdapter} from './adapters/nodemailer/NodemailerMailAdapter'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const prismaFeedbacKsRepository = new PrismaFeedbacKsRepository()
    const nodeMailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacKsRepository, nodeMailerMailAdapter)

    await submitFeedbackUseCase.execute({type, comment, screenshot})

    return res.status(201).send()
})