// Тестовый тест
describe('Проверка страницы конструктора', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Проверка react-dnd', () => {
    // Находим первый элемент и перетаскиваем
    cy.get('[data-test-id="ingridient-item"]').first().trigger('dragstart');
    cy.get('[data-test-id="drop-layout-area"]').trigger('drop');

    // Находим последний элемент и перетаскиваем
    cy.get('[data-test-id="ingridient-item"]').last().trigger('dragstart');
    cy.get('[data-test-id="drop-layout-area"]').trigger('drop');

    // Находим 3(4) элемент и перетаскиваем
    cy.get('[data-test-id="ingridient-item"]').eq(3).trigger('dragstart');
    cy.get('[data-test-id="drop-layout-area"]').trigger('drop');
  });

  it('Проверка открытия модального окна с информацией об ингридиенте', () => {
      cy.get('[data-test-id="ingridient-item"]').eq(3).click();
      cy.get('[data-test-id="modal-ingridient-popup"]').should('exist')
  })

  it('Проверка оформление заказа и получение информации о заказе', () => {
    const email = 'testEmail@mail.ru'
    const password = 'testPassword'

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'bla-bla-token',
        user: { id: 123, name: 'testUser' },
      },
    }).as('loginSuccess')

    cy.get('[data-test-id="ingridient-item"]').first().trigger('dragstart');
    cy.get('[data-test-id="drop-layout-area"]').trigger('drop');
    cy.get('[data-test-id="submit-button"]').click()
    cy.url().should('include', '/login')

    cy.get('[data-test-id="login-input"]').type(email);
    cy.get('[data-test-id="login-password"]').type(password);
    cy.get('[data-test-id="login-submit"]').click();
    cy.wait('@loginSuccess')
    cy.get('[data-test-id="submit-button"]').click()

    cy.intercept('POST', 'api/orders', {
      statusCode: 200,
      body: {
        ingredient: 'testIngredient',
        orderNumber: 123,
      }
    }).as('orderSuccess')

    cy.wait('@orderSuccess')
    cy.get('[data-test-id="modal-order-popup"]').should('exist')
  })
}); 
