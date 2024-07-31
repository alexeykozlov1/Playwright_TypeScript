import { test, expect, APIResponse } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';

test.describe.only('Contact', () => {
    let contactPage: ContactPage
    let randomPerson: APIResponse

    test.beforeAll(async () => {
        await apiController.init()
        randomPerson = await apiController.getUsers()
        const newUserTodo = await apiController.createUserTodo()
        console.log(newUserTodo)
    })



    test('Fill out and verify', async ({ page }) => {
        contactPage = new ContactPage(page)

        await contactPage.navigate()
        await contactPage.submitForm(
            randomPerson['name'],
            randomPerson['email'],
            randomPerson['phone'],
            randomPerson['website']
        )


        await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    })



})
