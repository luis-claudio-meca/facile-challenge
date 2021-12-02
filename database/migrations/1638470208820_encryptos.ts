import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Encryptos extends BaseSchema {
  protected tableName = 'encryptos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('encripted_name')

      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
