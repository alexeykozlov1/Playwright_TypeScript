import { test, expect } from '@playwright/test';
import CartPage from '../pages/cart.page';
const path = require('path')

test.describe('Upload File', () => {
    let cartPage: CartPage

    const fileName = ['worm.png', 'mario.png']

    for (const name of fileName) {
        test(`should upload the ${name}`, async ({ page }) => {
            cartPage = new CartPage(page)
    
            await page.goto("https://practice.sdetunicorns.com/cart/")
             const filePath = path.join(__dirname, `../data/${name}`)
            // const filePath = path.join(__dirname, '../data/worm.png')
    
            cartPage.uploadComponent().uploadFile(filePath)
    
    
            await expect(cartPage.uploadComponent().suceessTxt)
                .toContainText('uploaded successfully')
        })
    }

    test.skip('Upload the file over DOM', async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/cart/")
        // const filePath = path.join(__dirname, '../data/worm.png')
        const filePath = path.join(__dirname, '../data/worm.png')


        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1')
            if (selector) {
                selector.className = ''
            }
        })


        await page.setInputFiles('input#upfile_1', filePath)
        await page.locator('#upload_1').click()

        // await page.locator('#wfu_messageblock_header_1_1')
        // .waitFor({ state: 'visible', timeout: 10000 })

        await expect(page.locator('#wfu_messageblock_header_1_1'))
            .toContainText('Zuploaded successfully', { timeout: 10000 })


    })


})
