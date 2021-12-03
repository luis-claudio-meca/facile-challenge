import { MyReporter } from './Reporters/MyReporter';
import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchemaEncriptoValidator  {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    name: schema.string({})
  })

  public reporter = MyReporter


  public messages = {
    required: 'O campo {{ field }} é obrigatório',
    string : 'O campo {{ field }} deve ser uma string' 
  } 
  
}
