/// <reference types="cypress" />

describe("Signup Page Tests", () => {
    beforeEach(() => {
        cy.visit("https://next-realworld.vercel.app/user/register")
    })

    const validUserData = {
        username: 'validusername',
        email: 'validemail@example.com',
        password: 'ValidPassword123!'
    };

    const invalidUserData = {
        
        invalidUsername: 'invalid!username',
        invalidEmail: 'invalidemail',
        weakPassword: 'weak'
    };

    it('Successful sign-up', () => {
        signUp(validUserData);
        cy.url().should('include', '/user');
    });

    context('Invalid Data Tests', () => {
        it('Invalid username', () => {
            signUp(invalidUserData.invalidUsername, validUserData.email, validUserData.password);
            cy.get('.error-messages').should('contain', 'username can only contain letters, numbers, and underscores');
        });

        it('Invalid password', () => {
            signUp(validUserData.username, validUserData.email, invalidUserData.weakPassword);
            cy.get('.error-messages').should('contain', 'password is too weak');
        });

        it('Invalid Email', () => {
            signUp(validUserData.username, invalidUserData.invalidEmail, validUserData.password);
            cy.get('.error-messages').should('contain', 'email is invalid');
        });

        it('Duplicate username', () => {
            signUp('existingusername', validUserData.email, validUserData.password);
            cy.get('.error-messages').should('contain', 'username has already been taken');
        });

        it('Duplicate email', () => {
            signUp(validUserData.username, 'existingemail@example.com', validUserData.password);
            cy.get('.error-messages').should('contain', 'email has already been taken');
        });

        it('Special Characters in Username', () => {
            signUp('username!@#', validUserData.email, validUserData.password);
            cy.get('.error-messages').should('contain', 'username can only contain letters, numbers, and underscores');
        });

        it('Empty Fields', () => {
            signUp('', '', '');
            cy.get('.error-messages').should('contain', 'username can\'t be blank');
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });

        it('Empty Email', () => {
            signUp(validUserData.username, '', validUserData.password);
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
        });

        it('Empty Password', () => {
            signUp(validUserData.username, validUserData.email, '');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });

        it('Empty Username and Email', () => {
            signUp('', '', validUserData.password);
            cy.get('.error-messages').should('contain', 'username can\'t be blank');
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
        });

        it('Empty Username and Password', () => {
            signUp('', validUserData.email, '');
            cy.get('.error-messages').should('contain', 'username can\'t be blank');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });

        it('Empty Email and Password', () => {
            signUp(validUserData.username, '', '');
            cy.get('.error-messages').should('contain', 'email can\'t be blank');
            cy.get('.error-messages').should('contain', 'password can\'t be blank');
        });

        it('Invalid Username and Email', () => {
            signUp(invalidUserData.invalidUsername, invalidUserData.invalidEmail, validUserData.password);
            cy.get('.error-messages').should('contain', 'username can only contain letters, numbers, and underscores');
            cy.get('.error-messages').should('contain', 'email is invalid');
        });

        it('Invalid Username and Password', () => {
            signUp(invalidUserData.invalidUsername, validUserData.email, invalidUserData.weakPassword);
            cy.get('.error-messages').should('contain', 'username can only contain letters, numbers, and underscores');
            cy.get('.error-messages').should('contain', 'password is too weak');
        });

        it('Invalid Email and Password', () => {
            signUp(validUserData.username, invalidUserData.invalidEmail, invalidUserData.weakPassword);
            cy.get('.error-messages').should('contain', 'email is invalid');
            cy.get('.error-messages').should('contain', 'password is too weak');
        });
    });

    function signUp(username, email, password) {
        cy.get(':nth-child(1) > .form-control').type(username || validUserData.username);
        cy.get(':nth-child(2) > .form-control').type(email || validUserData.email);
        cy.get(':nth-child(3) > .form-control').type(password || validUserData.password);
        cy.get('.btn').click();
    }
});
