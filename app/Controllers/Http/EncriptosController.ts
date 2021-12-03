import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Encripto from 'App/Models/Encripto';
import SchemaEncriptoValidator from 'App/Validators/SchemaEncriptoValidator';
import Encryption from '@ioc:Adonis/Core/Encryption'



export default class EncriptosController {

  public async index({ }: HttpContextContract) { }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {

    try {
      await request.validate(SchemaEncriptoValidator)

      const name = request.input('name')

      const encriptoId = await Encripto.create({
        encriptedName: Encryption.encrypt(name)
      })

      response.send(encriptoId)


    } catch (error) {
      response.badRequest(error.messages)
    }

  }

  public async show({ request, response }: HttpContextContract) {
    
    
    try {
      const id = request.param('id')

      const encriptoId = await Encripto.findOrFail(id)

      response.send(encriptoId)

    } catch (error) {
      response.badRequest(error.messages)
    }

  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
