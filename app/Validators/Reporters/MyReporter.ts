import {
    ValidationException,
    MessagesBagContract,
  } from '@ioc:Adonis/Core/Validator'
  
 
  type ErrorNode = {
    message: string,
    code: 'E_VALIDATION_FAILURE',
  }
  
  export class MyReporter implements ErrorReporterContract<{ errors: ErrorNode[] }> {
    public hasErrors = false
  
   
    private errors: ErrorNode[] = []
  
    constructor (
      private messages: MessagesBagContract,
      private bail: boolean,
    ) {
    }
  
    
    public report (
      pointer: string,
      rule: string,
      message: string,
      arrayExpressionPointer?: string,
      args?: any
    ) {
     
      this.hasErrors = true
  
      
      const errorMessage = this.messages.get(
        pointer,
        rule,
        message,
        arrayExpressionPointer,
        args,
      )
  
      
      this.errors.push({ code: 'E_VALIDATION_FAILURE' , message: errorMessage })
  
      
      if (this.bail) {
        throw this.toError()
      }
    }
  
    
    public toError () {
      throw new ValidationException(false, this.toJSON())
    }
  
    
    public toJSON () {
      return {
        errors: this.errors,
      }
    }
  }


export interface ErrorReporterContract<Messages extends any = any> {
    hasErrors: boolean

    report(
      pointer: string,
      rule: string,
      message: string,
      arrayExpressionPointer?: string,
      args?: any
    ): void
  
    toError(): any
  
    toJSON(): Messages
}