import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Encryptos from 'App/Models/Encrypto';
import SchemaEncriptoValidator from 'App/Validators/SchemaEncriptoValidator';
import Encryption from '@ioc:Adonis/Core/Encryption'



export default class EncryptosController {

  public async index({ }: HttpContextContract) { }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {

    try {
      await request.validate(SchemaEncriptoValidator)

      const name = request.input('name')

      const encryptoId = await Encryptos.create({
        encriptedName: Encryption.encrypt(name)
      })

      response.send(encryptoId)

    } catch (error) {
      response.badRequest(error.messages)
    }

  }

  public async show({ request, response }: HttpContextContract) {


    try {
      const id = request.param('id')

      const encrypto = await Encryptos.findOrFail(id)

      const descryptoId = {
        id: encrypto.id,
        name: Encryption.decrypt(encrypto.encriptedName)
      }

      response.send(descryptoId)

    } catch (error) {
      response.badRequest({ error: "Id não existe" })
    }

  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
