import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { test: 'Faile Challenge' }
})

Route.resource('encripts', 'EncriptosController')
