/// <reference types="cypress" />

describe("Login Page Tests", () => {
    beforeEach(() => {
        cy.visit("https://next-realworld.vercel.app/user/login")
    })

    const validUserData = {
        email: 'validemail@example.com',
        password: 'ValidPassword123!'
    };

    const invalidUserData = {
        incorrectPassword: 'IncorrectPassword',
        invalidEmail: 'invalidemail@example.com',
        invalidEmailFormat: 'invalidemailformat',
        emailCaseSensitivity: 'ValidEmail@example.com',
        passwordCaseSensitivity: 'validPASSWORD123!'
    };

    it('Successful sign-in', () => {
        signIn(validUserData.email, validUserData.password);
        cy.url().should('include', '/user');
    });

    context('Incorrect Data Tests', () => {
        it('Incorrect password', () => {
            signIn(validUserData.email, invalidUserData.incorrectPassword);
            cy.get('.error-messages').should('contain', 'password is invalid');
        });

        it('Incorrect Email', () => {
            signIn(invalidUserData.invalidEmail, validUserData.password);
            cy.get('.error-messages').should('contain', 'email is invalid');
        });

        it('Invalid Email Format', () => {
            signIn(invalidUserData.invalidEmailFormat, validUserData.password);
            cy.get('.error-messages').should('contain', 'email is invalid');
        });

        it('Email Case Sensitivity', () => {
            signIn(invalidUserData.emailCaseSensitivity, validUserData.password);
            cy.url().should('include', '/user');
        });

        it('Password Case Sensitivity', () => {
            signIn(validUserData.email, invalidUserData.passwordCaseSensitivity);
            cy.url().should('include', '/user');
        });

        it('Empty Email and Password', () => {
            signIn('', '');
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });

        it('Empty Email Field', () => {
            signIn('', validUserData.password);
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
        });

        it('Empty Password Field', () => {
            signIn(validUserData.email, '');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });
    });

    function signIn(email, password) {
        cy.get(':nth-child(1) > .form-control').type(email || validUserData.email);
        cy.get(':nth-child(2) > .form-control').type(password || validUserData.password);
        cy.get('.btn').click();
    }
});
