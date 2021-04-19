const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listAccountsByCustomer = async (customerId) =>{
    //Buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(customerId)
    //Si la lista de resultados su tamano es cero
    //Es porque no existe un cliente con esa cédula
    if (customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }

    //Cuando se retorna directamente el resultado de una función que
    //haya que esperar el resultado, no es necesario usar el await..
    return AccountRepository.listAccountsByCustomer(customerId)
}

AccountService.create = async (account) => {
    //buscamos el cliente por id para verificar si existe
    const customerFound = await CustomerRepository.findByID(account.customerid)
    //Si la lista de resultados su tamano es cero
    //Es porque no existe un cliente con esa cédula
    if (customerFound.length === 0) {
        throw new Error('Customer does not exist')
    }
    //Consultando las cuentas del cliente..., el id del cliente viene en el objeto
    const accountsByCustomer = await AccountRepository.listAccountsByCustomer(account)

    //Verificando que solo tenga hasta tres...
    if (accountsByCustomer.length >= 3) {
        throw new Error('No more than 3 accounts')
    }

    account.openedAt = new Date(); //Colocando la fecha de apertura
    account.amount = 0; //Colocando el saldo inicial
    await AccountRepository.create(account)
}

AccountService.consign = async(account) =>{
    //Se busca id cuenta para verificar si existe
    const findAccount = await AccountRepository.findByID(account.id)

    if (findAccount.length === 0) {
        throw new Error('Account does not exist')
    }

    if (findAccount.account.amount <= 0) {
        throw new Error('You have not funds')        
    }
}

AccountService.withdraw = async(account) =>{

}