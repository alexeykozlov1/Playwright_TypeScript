import { test, expect } from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {
    let blogPage: BlogPage
    test('Recent posts and lenght of each word', async ({ page }) => {
        blogPage = new BlogPage(page)

        await blogPage.navigate()


        for (const el of await blogPage.recentPostsList.elementHandles()) {


            expect(((await el.textContent())?.trim())?.length).toBeGreaterThan(10)
        }
        expect(await blogPage.recentPostsList.count()).toEqual(5)
    })

})
