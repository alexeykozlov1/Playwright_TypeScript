import { test, expect } from '@playwright/test';
import ContactPage from '../pages/contact.page';
import { faker} from '@faker-js/faker'

test.describe.only('Contact', () => {
    let contactPage: ContactPage
    test('Fill out and verify', async ({ page }) => {
        contactPage = new ContactPage(page)
        
        await page.waitForTimeout(10000)
        await contactPage.navigate()
        await contactPage.submitForm(faker.person.firstName(), 
        faker.internet.email(), faker.phone.number(), faker.lorem.paragraph())


        await expect(contactPage.successTxt).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    })



})
