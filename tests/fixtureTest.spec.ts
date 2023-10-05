import { test } from '../test-options'
// import { PageManager } from './page-objects/pageManager'
import { faker } from '@faker-js/faker'
test('parametrized methods', async ({ pm, formLayoutsPage }) => { // 
    const email = faker.internet.email
    const fullname = faker.person.fullName

    await pm.formLayouts.usingTheGrid_signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD, 'Option 2')
    await pm.formLayouts.inlineForm_submit(fullname(), email(), true)
})
