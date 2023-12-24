
class Address {
  public id: uuid;
  public street: string;
  public city: string;
  public state: string;
  public postalCode: string;
  constructor(
    id: uuid,
    street: string,
    city: string,
    state: string,
    postalCode: string,
    ) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;}
}

class Customer {
  public id: uuid;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  constructor(
    id: uuid,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    
    ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;}
  private _addresses: Address[] = [];

  addresses(): Address[] {
    return this._addresses;
  }

  addAddresses(addresses: Address) {
    this.addresses.push(addresses);
  }

  removeAddresses(addresses: Address) {
    const index = this.addresses.indexOf(addresses);
    if (index !== -1) {
      this.addresses.splice(index, 1);
    }
  }
}

class Service {
  public id: uuid;
  public name: string;
  public description: string;
  public price: number;
  constructor(
    id: uuid,
    name: string,
    description: string,
    price: number,
    ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;}
}

class Quote {
  public id: uuid;
  public customerId: string;
  public serviceId: string;
  public date: date;
  public totalAmount: number;
  public status: string;
  public address: Address;
  constructor(
    id: uuid,
    customerId: string,
    serviceId: string,
    date: date,
    totalAmount: number,
    status: string,
    address: Address,
    ) {
    this.id = id;
    this.customerId = customerId;
    this.serviceId = serviceId;
    this.date = date;
    this.totalAmount = totalAmount;
    this.status = status;
    this.address = address;}
}

class WorkOrder {
  public id: uuid;
  public quoteId: string;
  public date: date;
  public description: string;
  public hoursWorked: number;
  public materialsUsed: string;
  public totalCost: number;
  public address: Address;
  constructor(
    id: uuid,
    quoteId: string,
    date: date,
    description: string,
    hoursWorked: number,
    materialsUsed: string,
    totalCost: number,
    address: Address,
    ) {
    this.id = id;
    this.quoteId = quoteId;
    this.date = date;
    this.description = description;
    this.hoursWorked = hoursWorked;
    this.materialsUsed = materialsUsed;
    this.totalCost = totalCost;
    this.address = address;}
}

