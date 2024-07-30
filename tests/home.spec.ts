import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';


test.describe('Home', () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.navigate()
    })



    test('Open Homepage and verify the title', async ({ page }) => {
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns')
    })

    test.skip('About', async ({ page }) => {

        await page.goto("https://practice.sdetunicorns.com/about")
        await expect(page).toHaveTitle('About – Practice E-Commerce Site')
    })

    test('Click Get Started', async ({ page }) => {
        await homePage.getStartedBtn.click()
        await expect(page).toHaveURL(/.*#get-started/)
    })

    test('Verify heading text', async ({ page }) => {

        const headingTest = await homePage.headingText

        await expect(headingTest).toBeVisible()
    })


    test('Verify home link with css and text', async ({ page }) => {

        // const homeText = await page.locator('#zak-primary-menu >> text=Home')
        const homeText = await homePage.homeLink
        await expect(homeText).toBeEnabled()
    })

    test('Verify search icon', async ({ page }) => {
        // const homeText = await page.locator('#zak-primary-menu >> text=Home')
        const searchIcon = homePage.searchIcon
        await expect(searchIcon).toBeVisible()
    })
    test('Verify text of all nav links', async ({ page }) => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ]

        // for (const el of await navLinks.elementHandles()) {
        //     console.log(await el.textContent())
        // }
        // const navLinks = page.locator('#zak-primary-menu li[id*=menu]').nth(3)
        // expect(await navLinks.allTextContents()).toEqual(expectedLinks)
        // expect(await navLinks.textContent()).toEqual("Blog")
        // expect(await navLinks.textContent()).toEqual(expectedLinks[3])
        expect(await homePage.getNavLinksText()).toEqual(expectedLinks)
    })


})
