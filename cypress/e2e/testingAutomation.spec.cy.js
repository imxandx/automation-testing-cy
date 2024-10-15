// add .only = adicionar ao lado de it / vai rodar só esse trecho de código

describe('Functional Automation Test', () => {
/*
  // Login
  it('should login successfully', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should('contain', 'Products')
  })

  it('should validate incorrect login', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user1')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  })
  
  it('should validate correct password', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce2')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  })
  */

  // Fluxo de compras
  it('should carry out the product purchasing flow', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('.title').should('contain', 'Products')

    // Ordenação de produtos de menor para maior valor
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

    // Validando a ordenação desses produtos
    cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
    cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
    cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')

    // Adicionando produtos ao carrinho
    cy.contains('Sauce Labs Onesie').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    cy.contains('Sauce Labs Bike Light').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    cy.contains('Sauce Labs Bolt T-Shirt').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="back-to-products"]').click()

    // Checagem da quantidade de produtos adicionados ao carrinho
    cy.get('[data-test="shopping-cart-link"]').should('have.text', '3')

    // Check no carrinho
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_list > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
    cy.get('.cart_list > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
    cy.get('.cart_list > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

    // Checkout
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Test First Name')
    cy.get('[data-test="lastName"]').type('Test Last Name')
    cy.get('[data-test="postalCode"]').type('65565487')
    cy.get('[data-test="continue"]').click()

    // Verificando produtos no checkout
    cy.get('.cart_list > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
    cy.get('.cart_list > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
    cy.get('.cart_list > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

    // Checagem do valor total
    cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')

    cy.get('[data-test="finish"]').click()

    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })
})