import type { EndPoints } from '../types/cms-types'
import { MicroCMS } from 'microcms-lib'
import { config } from 'dotenv'

config() // .env

const cms = new MicroCMS<EndPoints>({
  service: process.env.SERVICE!,
  apiKey: process.env.APIKEY,
  apiWriteKey: process.env.APIKEY_WRITE,
  apiGlobalKey: process.env.APIKEY_GLOBAL
})

const main = async () => {
  // 10 write tests
  console.log('\n-- write --')
  for (let i = 0; i < 10; i++) {
    await cms
      .post('contents', { title: 'データ' + i, body: '本文', visible: true })
      .then((id) => console.log(`id:${id}`))
  }

  // display data
  const result = await cms.gets('contents', {
    limit: 10000,
    fields: ['id', 'title'],
    orders: 'createdAt'
  })
  if (result) {
    const { totalCount, contents } = result
    console.log(`\n-- read: ${contents.length}/${totalCount} --`)
    contents.forEach(({ id, title }) => {
      console.log(id, title)
    })
  }

  // // batch deletion
  console.log('\n-- delete --')
  if (result) {
    for (let i = 0; i < result.contents.length; i++) {
      await cms
        .del('contents', result.contents[i]['id'])
        .then((v) => (v ? console.log(`削除:${result.contents[i]['id']}`) : false))
    }
  }
}
main()
