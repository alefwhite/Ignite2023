import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

const fakeQuestionsRepository: QuestionRepository = {
  create: async (question: Question) => {
    console.log(question);
  },
};

test('Create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova resposta',
    content: 'Conteúdo da pergunta',
  });

  expect(question.id).toBeTruthy();
});
