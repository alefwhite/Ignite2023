import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer);
  },
};
test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
