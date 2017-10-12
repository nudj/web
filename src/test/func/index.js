/* global fixture test */

import { Selector } from 'testcafe'

const email = Selector('input[name="email"]')
const password = Selector('input[name="password"]')
const shareButton = Selector('button').withText('Send to a friend')
const applyButton = Selector('button').withText('Apply')
const loginTab = Selector('a').withText('Log In')
const loginButton = Selector('button[type=submit]')

fixture`Open page`
  .page`http://localhost/jobs/fake-company+senior-fake-test-job`

test('Referrer can view more info', async t => {
  await t
    .click(Selector('span').withText('Find out more +'))
    .click(Selector('span').withText('Less -'))
})

test('Referrer can nudj', async t => {

  await t.click(shareButton)

  const location = await t.eval(() => window.location)

  await t.expect(location.pathname).contains('/nudj')
  .takeScreenshot('./referrer/nudj-page.png')
})

test('Referrer can apply', async t => {

  await t.click(applyButton)

  const location = await t.eval(() => window.location)

  await t.expect(location.pathname).contains('/apply')
  .takeScreenshot('./referrer/apply.png')
})
